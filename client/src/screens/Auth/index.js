import React, { useEffect, useState } from "react"
// import { User } from "../../api"
import { Button, Input } from "../../components"

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

  // const RegisterUser = () => User.register({ email, name, password })

  const Login = (
    <div>
      <div>This is the login</div>
      <Input id="email" onChange={updateAuthFields} value={email} />
      <Input id="password" onChange={updateAuthFields} value={password} />
      <div>
        <Button primary onClick={() => toggleRegister(!register)}>
          Login
        </Button>
        <Button primary onClick={() => toggleRegister(!register)}>
          Go To Register
        </Button>
      </div>
    </div>
  )
  const Register = (
    <div>
      <div>This is the register</div>
      <Input id="email" onChange={updateAuthFields} value={email} />
      <Input id="name" onChange={updateAuthFields} value={name} />
      <Input id="password" onChange={updateAuthFields} value={password} />
      <div>
        <Button primary onClick={RegisterUser}>
          Register
        </Button>
        <Button primary onClick={() => toggleRegister(!register)}>
          Go To Login
        </Button>
      </div>
    </div>
  )

  return <div>{register ? Register : Login}</div>
}
