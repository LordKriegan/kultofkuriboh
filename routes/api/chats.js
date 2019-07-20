const router = require('express').Router();
const { User, Chat } = require('../../models');

router.get("/:id", (req, res) => {
    User.findById(req.params.id, (err, resp) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        Chat.find({
            roomId: {
                $in: resp.chats
            }
        }).populate("users", "name picture").exec((err, chatResp) => {
            if (err) {
                res.status(500).json({ error: err });
            }
            res.json(chatResp);
        })
    })
}) ;

module.exports = router