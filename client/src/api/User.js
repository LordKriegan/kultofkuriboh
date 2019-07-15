import axios from "axios"
import jwt from "jsonwebtoken"

class User {
  /**
   * Asynchronous method for logging in user, verifying token, and setting token
   * @param {*} loginInfo users email and password
   */
  async login(loginInfo) {
    const { data: token } = await axios.post("/api/user/login", loginInfo)
    const user = this.verifyToken(token)
    if (user) {
      this.setTokenInfo({ token, user })
    }
  }

  /**
   * Asynchronous method for registering a user, verifying and setting token
   * @param {*} registration registration info including address, name, email, password
   */
  async register(registration) {
    const { data: token } = await axios.post("/api/user/new", registration)
    const user = this.verifyToken(token)
    if (user) {
      this.setTokenInfo({ token, user })
    }
  }

  /**
   * A method for grabbing the user data from localStorage
   */
  getUser() {
    const user = localStorage.getItem("user") || null
    return user ? JSON.parse(user) : null
  }

  /**
   * A method for grabbing the user token from localStorage
   */
  getToken() {
    return localStorage.getItem("token") || null
  }

  /**
   * A method for setting a user and token to localStorage
   * @param {*} token the jwt token
   * @param {*} user user data decoded from the token
   */
  setTokenInfo({ token, user }) {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  }

  /**
   * A method for verifying a signed jwt
   * @param {*} token the jwt token
   */
  verifyToken(token) {
    return jwt.verify(this.getToken() || token, process.env.REACT_APP_JWT_SECRET)
  }
}

export default new User()
