const router = require('express').Router();
const { Trade, User } = require('../../models');
const aes256 = require('aes256');
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
        Trade.find({ _id: { $in: resp.trades } }).populate("sender.userId reciever.userId", "picture name").exec((err, tradeResp) => {
            if (err) {
                res.status(500).json({ error: err });
            }
            let tradeData = {
                active: [],
                pending: [],
                completed: []
            }
            tradeResp.forEach((elem) => {
                if (elem.accepted === "accept") {
                    if (elem.sender.recieved === "pending" || elem.reciever.recieved === "pending") {
                        tradeData.active.push(elem)
                    } else {
                        tradeData.completed.push(elem)
                    }
                } else if (elem.accepted === "pending") {
                    tradeData.pending.push(elem)
                } else if (elem.accepted === "reject") {
                    tradeData.completed.push(elem)
                }
            });
            res.json(tradeData);
        });
    });
});

router.get("/findOne/:id", (req, res) => {
    Trade.findById(req.params.id).populate("sender.userId reciever.userId", "picture name address").exec((err, resp) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        resp.sender.userId.address = aes256.decrypt(process.env.AES256_KEY, resp.sender.userId.address);
        resp.reciever.userId.address = aes256.decrypt(process.env.AES256_KEY, resp.reciever.userId.address);
        res.json(resp);
    });
});

router.put("/acceptStatus", (req, res) => {
    Trade.findByIdAndUpdate(req.body.id, { accepted: req.body.acceptStatus }, { new: true, runValidators: true }, (err, resp) => {
        if (err) {
            res.status(500).json({ error: err })
        }
        //need to take cards out of each users haves and put them in pending status.
        //maybe a pending status isn't needed? the same data exists in the trades collection
        res.json("User Trade Updated");
        if (resp.accepted === "accept") {
            //update senders haves
            User.findById(resp.sender.userId, (err, response) => {
                if (err) {
                    console.log(err);
                }
                let newUserObj = {
                    haves: JSON.parse(JSON.stringify(response.haves)) //deep clone
                };
                resp.sender.cards.forEach((elem) => {
                    newUserObj.haves.forEach((havesElem, i) => {
                        if (elem.name === havesElem.name && elem.set === havesElem.set) {
                            havesElem.quantity -= elem.quantity
                            if (havesElem.quantity <= 0) {
                                newUserObj.haves.splice(i, 1);
                            }
                        }
                    });
                });
                User.findByIdAndUpdate(resp.sender.userId, newUserObj, (err, resp) => {
                    if (err) {
                        console.error(err);
                    }
                    console.log('sender updated')
                });
            });
            //update recievers haves
            User.findById(resp.reciever.userId, (err, response) => {
                if (err) {
                    console.log(err);
                }
                let newUserObj = {
                    haves: JSON.parse(JSON.stringify(response.haves)) //deep clone
                };
                resp.sender.cards.forEach((elem) => {
                    newUserObj.haves.forEach((havesElem, i) => {
                        if (elem.name === havesElem.name && elem.set === havesElem.set) {
                            havesElem.quantity -= elem.quantity
                            if (havesElem.quantity <= 0) {
                                newUserObj.haves.splice(i, 1);
                            }
                        }
                    });
                });
                User.findByIdAndUpdate(resp.reciever.userId, newUserObj, (err, resp) => {
                    if (err) {
                        console.error(err);
                    }
                    console.log('reciever updated')
                });
            });
        }
    });
});

router.put("/recievedStatus", (req, res) => {
    Trade.findByIdAndUpdate(req.body.id, {
        [req.body.trader + ".recieved"]: req.body.recieved
    }, { new: true, runValidators: true }, (err, resp) => {
        if (err) {
            res.json({ error: err });
        }

        User.findByIdAndUpdate((req.body.trader === "reciever") ? resp.sender.userId : resp.reciever.userId, {
            $inc: {
                rating: (req.body.recieved === "yes") ? 25 : -50
            }
        }, (err, userResp) => {
            if (err) {
                res.json({ error: err });
            }
            if (req.body.recieved === 'yes') {
                let userId = (req.body.trader === "reciever") ? resp.reciever.userId : resp.sender.userId
                let cardList = (req.body.trader === "reciever") ? resp.sender.cards : resp.reciever.cards;
                User.findById(userId, (err, userResp) => {
                    if (err) {
                        res.json({ error: err });
                    }
                    let userData = {
                        haves: userResp.haves,
                        wants: userResp.wants
                    };
                    for (var i = 0; i < cardList.length; i++) {
                        let found = false;
                        for (var j = 0; j < userData.haves.length; j++) {
                            if (userData.haves[j].name.toLowerCase() === cardList[i].name.toLowerCase() && userData.haves[j].set.toLowerCase() === cardList[i].set.toLowerCase()) {
                                userData.haves[j].quantity += cardList[i].quantity;
                                found = true;
                                break;
                            }
                        }
                        for (var j = 0; j < userData.wants.length; j++) {
                            if (userData.wants[j].name.toLowerCase() === cardList[i].name.toLowerCase() && userData.wants[j].set.toLowerCase() === cardList[i].set.toLowerCase()) {
                                userData.wants[j].quantity -= cardList[i].quantity;
                                if (userData.wants[j].quantity <= 0) userData.wants.splice(j, 1);
                                break;
                            }
                        }
                        if (!found) {
                            userData.haves.push(cardList[i]);
                        }
                    }
                    console.log(userData);
                    User.findByIdAndUpdate(userId, userData, (err, updatedUserResp) => {
                        if (err) {
                            res.json({ error: err });
                        }
                        res.json("Trade Updated!");
                    });
                });
            }

        });
    });
});
module.exports = router;