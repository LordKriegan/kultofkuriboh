const crypto = require("crypto")
const jwt = require("jsonwebtoken")

module.exports = {
    getHash: (password, salt) => {
        return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
      },
    getSalt: _ => crypto.randomBytes(16).toString("hex"),
    generateJWT: user => {
        let expire = new Date()
        expire.setDate(expire.getDate() + 7)
        let userObj = {
          id: user._id,
          email: user.email,
          name: user.name,
          exp: expire.getTime() / 1000,
        }
        return jwt.sign(userObj, process.env.JWT_SECRET)
      },
        
}