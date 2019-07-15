import React, { useState } from "react"
import { User } from "../../api"
import { Button, Card, Input, Typography } from "../../components"

export default function Profile({ user }) {
  const [{ name, email, password }, setUser] = useState({
    name: user.name,
    email: user.email,
    password: "",
  })
  const [editView, toggleEditView] = useState(false)
  function saveUser() {
    toggleEdit()
    User.updateUser({ email, name, password })
      .then(({ email, name }) => setUser({ ...user, email, name }))
      .catch(err => alert("Error updating user: ", err))
  }
  function toggleEdit() {
    toggleEditView(!editView)
  }
  function updateUser({ target: { id, value } }) {
    setUser({ name, email, password, [id]: value })
  }
  return (
    <div>
      <Typography text="Profile Page" type="h2" />
      <Card>
        {editView ? (
          <div>
            <Typography text="Name" type="h6" />
            <Input id="name" onChange={updateUser} value={name} />
            <Typography text="Email" type="h6" />
            <Input id="email" onChange={updateUser} value={email} />
            <Typography text="Password" type="h6" />
            <Input id="password" onChange={updateUser} value={password} placeholder="**********" />
            <Button onClick={toggleEdit} text="Cancel" type="outlined" />
            <Button onClick={saveUser} text="Save" type="contained" />
          </div>
        ) : (
          <div>
            <Typography text="Name" type="h6" />
            <Typography text={name} type="h6" />
            <Typography text="Email" type="h6" />
            <Typography text={email} type="h6" />
            <Button onClick={toggleEdit} text="Edit" type="outlined" />
          </div>
        )}
      </Card>
    </div>
  )
}
