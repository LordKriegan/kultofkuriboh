import React, { useState } from "react"

export default function Auth({ location }) {
  const [register, toggleRegister] = useState(false)

  const Login = () => (
    <div>
      <div>This is the login</div>
      <button onClick={() => toggleRegister(!register)}>Go to register</button>
    </div>
  )
  const Register = () => (
    <div>
      <div>This is the register</div>
      <button onClick={() => toggleRegister(!register)}>Go to login</button>
    </div>
  )

  return <div>{register ? <Register /> : <Login />}</div>
}
