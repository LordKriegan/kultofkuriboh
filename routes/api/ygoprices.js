const router = require('express').Router();
const axios = require('axios');
router.get("/cards/:cardName", (req, res) => {
    axios
    .get("http://yugiohprices.com/api/get_card_prices/" + req.params.cardName)
    .then(response => {
        res.json(response.data.data);
    })
    .catch(err => {
        console.error(err);
        res.json({error: err});
    });
});

router.get("/cardInfo/:cardName", (req, res) => {
    axios
    .get("http://yugiohprices.com/api/card_data/" + req.params.cardName)
    .then(response => {
        res.json(response.data.data);
    })
    .catch(err => {
        console.error(err);
        res.json({error: err});
    });
})

module.exports = router;