const router = require('express').Router();
const { Trade, UserTrade, User } = require('../../models');
router.post('/addNew', (req,res) => {
    const newTrade = {
        accepted: "pending",
        sentBy: req.body.sender.id,
        users: [{
                    cards: req.body.sender.cards,
                    recieved: "pending",
                    userId: req.body.sender.id
                },
                {
                    cards: req.body.reciever.cards,
                    recieved: "pending",
                    userId: req.body.reciever.id
                }]
    }
    Trade
        .create(newTrade)
        .then((response) => {
            console.log("user trade created");
            User.updateMany({ _id: {$in: [req.body.sender.id, req.body.reciever.id] }}, { $push: { trades: response._id }}, (err, resp) => {
                if (err) {
                    res.status(500).json({error: err});
                }
                res.json("Trade added to database!")
            });
        })
        .catch((err) => {
            res.status(500).json({error: err})
        });
})

module.exports = router;