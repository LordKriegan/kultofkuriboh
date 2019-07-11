const { Trade } = require('../../models');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/kultofkuriboh",{ useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true })
.then(_ => {
    Trade.findOneAndUpdate({
        _id: "5d26cfdaf5942d07b0a1bb35",
        "users.userId": "5d26c37c6d37653e506038a6"
    }, {
        $set: {
            "users.$.recieved": "p33nding"
        }
    },{new: true},(err, resp) => {
        
        if (err) console.log(err);
        console.log(resp);
        mongoose.disconnect()
    })
})
.catch(e => console.log(e))

