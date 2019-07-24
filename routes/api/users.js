const router = require("express").Router()
const { User } = require("../../models")
const aes256 = require("aes256")
const { getHash, getSalt, generateJWT } = require('../../helpers')

router.delete("/remove/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, resp) => {
    if (err) {
      res.status(500).json({ error: err })
    }
    res.json("User deleted.")
  })
})

router.get("/findOne/:id", (req, res) => {
  User.findById(req.params.id, { salt: 0, hash: 0 }, (err, resp) => {
    if (err) {
      res.status(500).json({ error: err })
    }
    resp.address = aes256.decrypt(process.env.AES256_KEY, resp.address)
    res.json(resp)
  })
})

router.put("/update", (req, res) => {
  let updatedUser = {}
  const { id, name, email, password, picture, biography, address } = req.body
  if (name) updatedUser.name = name
  if (email) updatedUser.email = email
  if (password) {
    const salt = getSalt()
    updatedUser.salt = salt
    updatedUser.hash = getHash(password, salt)
  }
  if (picture) updatedUser.picture = picture
  if (biography) updatedUser.biography = biography
  if (address) updatedUser.address = aes256.encrypt(process.env.AES256_KEY, address)
  console.log(updatedUser)
  User.findByIdAndUpdate(id, updatedUser, { new: true }, (err, resp) => {
    if (err) {
      res.status(500).json({ error: err })
    }
    res.status(201).json(generateJWT(resp))
  })
})

router.put("/collection", (req, res) => {
  let userObj = {};
  if (req.body.haves.length) userObj.haves = req.body.haves;
  if (req.body.wants.length) userObj.wants = req.body.wants;
  User.findByIdAndUpdate(req.body.id, userObj, (err, resp) => {
    if (err) {
      res.status(500).json({ error: err })
    }
    res.json("User Updated!")
  })
})

router.get("/findHaves", (req, res) => {
  User.find(
    {
      "haves.name": {
        $regex: new RegExp("^" + _.escapeRegExp(req.query.name.toLowerCase()), "i"),
      },
      "haves.set": {
        $regex: new RegExp("^" + _.escapeRegExp(req.query.set.toLowerCase()), "i"),
      },
    },
    { salt: 0, hash: 0, address: 0, trades: 0, chats: 0 },
    (err, resp) => {
      if (err) {
        console.error(err)
      }
      console.log(resp)
      res.json(resp)
    },
  )
})

router.get("/findWants", (req, res) => {
  User.find(
    {
      "wants.name": {
        $regex: new RegExp("^" + _.escapeRegExp(req.query.name.toLowerCase()), "i"),
      },
      "wants.set": {
        $regex: new RegExp("^" + _.escapeRegExp(req.query.set.toLowerCase()), "i"),
      },
    },
    { salt: 0, hash: 0, address: 0, trades: 0, chats: 0 },
    (err, resp) => {
      if (err) {
        console.error(err)
      }
      console.log(resp)
      res.json(resp)
    },
  )
})
module.exports = router
