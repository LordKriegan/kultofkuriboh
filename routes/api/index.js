const router = require('express').Router();
// router.use("/<route name>", require('./<js file>'))
router.use("/user", require('./users.js'));
router.use("/trade", require('./trades.js'));
router.use("/chats", require('./chats.js'));
router.use("/ygoprices", require('./ygoprices.js'));
module.exports = router;