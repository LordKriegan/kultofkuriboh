const router = require('express').Router();
const { User } = require('../../models');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const aes256 = require('aes256');
const getHash = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}
const getSalt = _ => {
    return crypto.randomBytes(16).toString("hex");
}
const generateJWT = user => {
    let expire = new Date();
    expire.setDate(expire.getDate() + 7);
    let userObj = {
        id: user._id,
        email: user.email,
        username: user.name,
        exp: expire.getTime() / 1000
    }
    return jwt.sign(userObj, process.env.JWT_SECRET);
}

router.post("/new", (req, res) => {
    salt = getSalt();
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        salt: salt,
        hash: getHash(req.body.password, salt),
        address: aes256.encrypt(process.env.AES256_KEY, req.body.address)
    };
    if (req.body.picture) newUser.picture = req.body.picture;
    if (req.body.biography) newUser.biography = req.body.biography;
    User
        .create(newUser)
        .then(response => {
            res.json(generateJWT(response));
        })
        .catch(error => res.status(400).json(error));

});

router.post("/login", (req, res) => {
    User.find({ email: req.body.email }, (err, resp) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        if (resp.length) {
            if (resp[0].hash === getHash(req.body.password, resp[0].salt)) {
                res.json(generateJWT(resp));
            } else {
                res.status(401).json({ error: "Invalid Password!" });
            }
        } else {
            res.status(404).json({ error: "No user found by that e-mail!" });
        }
    });
});

router.delete("/remove/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, resp) => {
        if (err) {
            res.status(500).json({error: err});
        }
        res.json("User deleted.");
    });
});

router.get("/findOne/:id", (req, res) => {
    User.findById(req.params.id, {salt: 0, hash: 0} , (err, resp) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        resp.address = aes256.decrypt(process.env.AES256_KEY, resp.address);
        res.json(resp);
    });
});

router.put("/update", (req, res) => {
    let updatedUser = {};
    const { id, name, email, password, picture, biography, address } = req.body
    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (password) {
        const salt = getSalt();
        updatedUser.salt = salt;
        updatedUser.hash = getHash(password, salt);
    }
    if (picture) updatedUser.picture = picture;
    if (biography) updatedUser.biography = biography;
    if (address) updatedUser.address = aes256.encrypt(process.env.AES256_KEY, address);
    console.log(updatedUser);
    User.findByIdAndUpdate(id, updatedUser, (err, resp) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        res.json('User Updated!');
    });
});

router.put("/haves", (req, res) => {
    User.findByIdAndUpdate(req.body.id, { haves: req.body.cards }, (err, resp) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        res.json('User Updated!');
    });
});

router.put("/wants", (req, res) => {
    User.findByIdAndUpdate(req.body.id, { wants: req.body.cards }, (err, resp) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        res.json('User Updated!');
    });
});
module.exports = router;