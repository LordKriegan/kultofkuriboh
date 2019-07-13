import React, { useState } from "react"
import { Button, Card, Input } from "../../components"

export default function Auth({ location }) {
  const [register, toggleRegister] = useState(false)
  const [{ email, name, password }, setAuthFields] = useState({
    email: "",
    name: "",
    password: "",
  })

  const updateAuthFields = ({ target: { id, value } }) => {
    setAuthFields({ [id]: value })
  }

  const Login = (
    <div>
      <Card>
        <Input id="email" onChange={updateAuthFields} value={email} label="Email" />
        <Input id="password" onChange={updateAuthFields} value={password} label="Password" />
        <div>
          <Button onClick={() => toggleRegister(!register)} text="Login" type="primary" />
          <Button onClick={() => toggleRegister(!register)} text="Go To Register" type="outlined" />
        </div>
      </Card>
    </div>
  )
  const Register = (
    <div>
      <Card>
        <Input id="email" onChange={updateAuthFields} value={email} label="Email" />
        <Input id="name" onChange={updateAuthFields} value={name} label="Name" />
        <Input id="password" onChange={updateAuthFields} value={password} label="Password" />
        <div>
          <Button text="Register" type="primary" />
          <Button onClick={() => toggleRegister(!register)} text="Go to Login" type="outlined" />
        </div>
      </Card>
    </div>
  )

  return <div>{register ? Register : Login}</div>
}
