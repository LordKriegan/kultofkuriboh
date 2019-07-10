const router = require('express').Router();
// router.use("/<route name>", require('./<js file>'))
 router.use("/user", require('./users.js'))
module.exports = router;