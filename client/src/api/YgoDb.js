import axios from 'axios';
class YgoDb {
      /**
   * Asynchronous method for getting all printings of a card
   * @param cardName Name of Card (this api is case-sensitive and needs an exact match)
   * returns a promise
   */
  cardSets(cardName) {
    return axios.get("/api/ygoprices/cards/" + encodeURIComponent(cardName));    
  }

  cardInfo(cardName) {
      return axios.get("/api/ygoprices/cardInfo/" + encodeURIComponent(cardName));
  }
}

export default new YgoDb();