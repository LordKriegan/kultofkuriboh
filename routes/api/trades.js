const router = require('express').Router();
const { Trade, UserTrade, User } = require('../../models');
router.post('/addNew', (req,res) => {
    /*
    example body
    {
	"sender": {
		"cards": [{"name": "blue eyes", "set": "lob", "quantity": 4}, {"name": "lord of d", "set": "lob", "quantity": 4}],
		"id": "5d26c37c6d37653e506038a6"
	},
	"reciever": {
		"cards": [{"name": "red eyes", "set": "lob", "quantity": 4}, {"name": "red eyes wyvern", "set": "lob", "quantity": 4}],
		"id": "5d26cd422f61b30fdcb6078f"
	},
	"sentBy": "5d26c37c6d37653e506038a6"
    }
    */
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