import React, { useState } from "react"
import moment from "moment"
import { User } from "../../api"
import { Button, Card, Input, Typography } from "../../components"

function getGreetingTime(m) {
  if (!m || !m.isValid()) {
    return
  }
  var split_afternoon = 12
  var split_evening = 17
  var currentHour = parseFloat(m.format("HH"))
  return currentHour >= split_afternoon && currentHour <= split_evening
    ? "afternoon"
    : currentHour >= split_evening
    ? "evening"
    : "morning"
}

export default function Profile({ user }) {
  const greeting = getGreetingTime(moment())
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
      <Typography text={`Good ${greeting}, ${name}`} type="h3" />
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
