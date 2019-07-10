const router = require('express').Router();
const { User } = require('../../models');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

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
        address: req.body.address
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
        console.log(resp.length)
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

module.exports = router;