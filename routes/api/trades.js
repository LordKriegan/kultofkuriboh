const router = require('express').Router();
const { Trade, UserTrade, User } = require('../../models');
router.post('/addNew', (req, res) => {
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
        sentBy: req.body.sender.id,
        sender: {
            cards: req.body.sender.cards,
            recieved: "pending",
            userId: req.body.sender.id
        },
        reciever: {
            cards: req.body.reciever.cards,
            recieved: "pending",
            userId: req.body.reciever.id
        }
    }

    Trade
        .create(newTrade)
        .then((response) => {
            console.log("user trade created");
            User.updateMany({ _id: { $in: [req.body.sender.id, req.body.reciever.id] } }, { $push: { trades: response._id } }, (err, resp) => {
                if (err) {
                    res.status(500).json({ error: err });
                }
                res.json("Trade added to database!")
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        });
});

router.get("/findAll/:userId", (req, res) => {
    User.findById(req.params.userId, (err, resp) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        Trade.find({ _id: { $in: resp.trades } }, (err, tradeResp) => {
            if (err) {
                res.status(500).json({ error: err });
            }
            res.json(tradeResp);
        });
    });
});

router.get("/findOne/:id", (req, res) => {
    Trade.findById(req.params.id, (err, resp) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        res.json(resp);
    });
});

router.put("/acceptStatus", (req, res) => {
    Trade.findByIdAndUpdate(req.body.id, { accepted: req.body.acceptStatus }, (err, resp) => {
        if (err) {
            res.status(500).json({ error: err })
        }
        res.json("User Trade Updated");
    });
});

router.put("recievedStatus", (req, res) => {
    /*
        sample body: {
            trader: "sender"/"reciever",
            recieved: "yes"/"no"
            id: "trade id"
        }
        find trade
        check if sender or reciever
        if sender update sender.recieved
            get trade.reciever._id
            find reciever
            let recieverRating = reciever.rating
            if sender.recieved === no
                recieverRating -= 50
            else
                recieverRating += 25
            reciever.update rating then send back response
        else update reciever.recieved
            get trade.sender._id
            find sender
            let senderRating = sender.rating
            if reciever.recieved === no
                senderRating -= 50
            else
                senderRating += 25
            sender.update then send back response      
    */
});
module.exports = router;