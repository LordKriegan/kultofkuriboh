# kultofkuriboh
A yugioh trading app that tracks (un/)successful trades so the user can make an informed decision before trading.


Da Plan:

user can signup/login as usual
using tcgplayer api, they can add cards to their haves/wants list
can browse other by other users haves/wants
can start chats with them
can create trade by selecting cards from other user's haves and from their own haves
other user can accept/reject trade
if accepted, both parties haves are moved into a pending status while trade is completed.
when both parties mark a trade as completed, pending cards are moved into their haves.

API routes:

POST /api/user/new
    body: {
        name,
        email,
        password,
        address,
        picture*,
        biography*
    }
    * fields are optional. Picture should be a link to a profile picture (maybe use filestack api to handle upload/hosting) and biography should be a 500 character max description of the user.
    Will return a JSON web token as response
POST /api/user/login
    body: {
        email,
        password
    }
    Will return a JSON web token as response if valid password.

DELETE /api/user/remove/:id
    deletes a user with given id

GET /api/user/findOne/:id
    finds a user with a given id

PUT /api/user/update
    body: {
        id,
        name*,
        email*,
        password*,
        picture*,
        biography*,
        address*
    }
    * fields are optional.
PUT /api/user/haves
PUT /api/user/wants 
    body: {
        id,
        haves
    }
    haves should be an array of objects in the following format: 
    [{
        name: String,
        set: String,
        quantity: Number
    }, ...]

GET /api/user/findHaves?name=CARDNAME&set=CARDSET
GET /api/user/findWants?name=CARDNAME&set=CARDSET
    will return an array of users who have the given card in their haves/wants list
POST /api/trade/addNew
    body: {
        sender: {
            cards: [{
                name: String,
                set: String,
                quantity: Number
            }, ...],
            id: user id (should be the id of the user who initiates trade)
        },
        reciever: {
            cards: [{
                name: String,
                set: String,
                quantity: Number
            }, ...],
            id: user id (should be the id the user who is recieving this trade)
        },
        sentBy: user id of the user who initiated trade
    }

GET /api/trade/findAll/:userId
    returns all trades found on a user with given user id

GET /api/trade/findOne/:id 
    returns a trade with a given Id

PUT /api/trade/acceptStatus
    body: {
        id: tradeId,
        acceptStatus: "accept" or "reject are the only valid values
    }
    marks a trade as accepted then pulls cards out of each users haves lists

PUT /api/trade/recievedStatus
    body: {
        trader: "sender" or "reciever" are the only valid values. mark as "sender" if a trade's "sentBy" value matches user id.
        recieved: "yes" or "no" are the only valid values
        id: trade id
    }
    marks a users half of the trade as recieved or not. if yes, the other user's rating is increased by 25 and the user's have and want lists are updated. otherwise other users rating is decremented by 50.