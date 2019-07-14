import axios from "axios"

class User {
  async login(user) {
    const { data } = await axios.post("/api/user/login", user)
    this.setTokenInfo(data)
  }

  async register(user) {
    const { data } = await axios.post("/api/user/new", user)
    this.setTokenInfo(data)
  }

  setTokenInfo(token) {
    localStorage.setItem("user", token)
  }
}

export default new User()
