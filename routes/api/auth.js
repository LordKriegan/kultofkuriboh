const router = require("express").Router()
const { User } = require("../../models")
const aes256 = require("aes256")
const { getHash, getSalt, generateJWT } = require('../../helpers')

router.post("/new", (req, res) => {
    salt = getSalt()
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      salt: salt,
      hash: getHash(req.body.password, salt),
      address: aes256.encrypt(process.env.AES256_KEY, req.body.address),
    }
    if (req.body.picture) newUser.picture = req.body.picture
    if (req.body.biography) newUser.biography = req.body.biography
    
    User.create(newUser)
      .then(response => {
        res.json(generateJWT(response))
      })
      .catch(error => { 
        console.log(error)
        res.status(400).json(error) 
      })
  })
  
  router.post("/login", (req, res) => {
    User.find({ email: req.body.email }, (err, resp) => {
      if (err) {
        res.status(500).json({ error: err })
      }
      if (resp.length) {
        if (resp[0].hash === getHash(req.body.password, resp[0].salt)) {
          res.json(generateJWT(resp[0]))
        } else {
          res.status(401).json({ error: "Invalid Password!" })
        }
      } else {
        res.status(404).json({ error: "No user found by that e-mail!" })
      }
    })
  })

  module.exports = router