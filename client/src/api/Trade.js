import axios from "axios"
import { User } from './'

class Trade {
    /**
     * @param {*} sender object of the sender. should include their cardlist and their user id. sender in the context of the app will always be the logged in user.
     * @param {*} reciever object of the reciever. should include the cardlist and their user id. reciever in the context of the app will always be the user the logged in user is building a trade with.
     */
    postNewTrade(sender, reciever) {
        const body = {
            sender: {
                cards: [...sender.cards],
                id: sender.id
            },
            reciever: {
                cards: [...reciever.cards],
                id: reciever.id
            },
            sentBy: sender.id
        }
        return axios.post("/api/trade/addNew", body, {
            headers: {
              "Authorization": "Bearer " + User.getToken()
            }
          })
    }
    /**
     * @param {*} userId get all trades on a given user id
     */
    findAllTrades(userId) {
        return axios.get("/api/trade/findAll/" + userId, {
            headers: {
                "Authorization": "Bearer " + User.getToken()
            }
        })
    }
}

export default new Trade()
