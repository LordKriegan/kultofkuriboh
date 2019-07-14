import React, { useState } from "react"
import { User } from "../../api"
import { Button, Card, Input } from "../../components"

export default function Auth({ history }) {
  const [register, toggleRegister] = useState(false)
  const [{ loginEmail, loginPassword }, setLoginFields] = useState({
    loginEmail: "",
    loginPassword: "",
  })
  const [{ address, email, name, password }, setRegisterFields] = useState({
    address: "",
    email: "",
    name: "",
    password: "",
  })

  const updateLoginFields = ({ target: { id, value } }) => {
    setLoginFields({
      loginEmail,
      loginPassword,
      [id]: value,
    })
  }

  const updateRegisterFields = ({ target: { id, value } }) => {
    setRegisterFields({
      address,
      email,
      name,
      password,
      [id]: value,
    })
  }

  const handleLogin = () =>
    User.login({ email: loginEmail, password: loginPassword })
      .then(() => history.push("/home"))
      .catch(e => alert(e))
  const handleRegister = () =>
    User.register({ address, email, name, password })
      .then(() => history.push("/home"))
      .catch(e => alert(e))
  const handleToggle = () => toggleRegister(!register)

  const Login = (
    <div>
      <Card>
        <Input
          id="loginEmail"
          onChange={updateLoginFields}
          value={loginEmail || ""}
          label="Email"
        />
        <Input
          id="loginPassword"
          onChange={updateLoginFields}
          value={loginPassword || ""}
          label="Password"
        />
        <div>
          <Button onClick={handleLogin} text="Login" type="contained" />
          <Button onClick={handleToggle} text="Go To Register" type="outlined" />
        </div>
      </Card>
    </div>
  )
  const Register = (
    <div>
      <Card>
        <Input id="address" onChange={updateRegisterFields} value={address || ""} label="Address" />
        <Input id="email" onChange={updateRegisterFields} value={email || ""} label="Email" />
        <Input id="name" onChange={updateRegisterFields} value={name || ""} label="Name" />
        <Input
          id="password"
          onChange={updateRegisterFields}
          value={password || ""}
          label="Password"
        />
        <div>
          <Button onClick={handleRegister} text="Register" type="contained" />
          <Button onClick={handleToggle} text="Go to Login" type="outlined" />
        </div>
      </Card>
    </div>
  )

  return <div>{register ? Register : Login}</div>
}
