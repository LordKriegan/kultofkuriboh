import axios from 'axios';
import { User } from './';
class YgoDb {
      /**
   * Asynchronous method for getting all printings of a card
   * @param cardName Name of Card (this api is case-sensitive and needs an exact match)
   * returns a promise
   */
  cardSets(cardName) {
    return axios.get("/api/ygoprices/cards/" + encodeURIComponent(cardName), {
      headers: {
        "Authorization": "Bearer " + User.getToken()
      }
    });    
  }

  cardInfo(cardName) {
      return axios.get("/api/ygoprices/cardInfo/" + encodeURIComponent(cardName), {
        headers: {
          "Authorization": "Bearer " + User.getToken()
        }
      });
  }
}

export default new YgoDb();