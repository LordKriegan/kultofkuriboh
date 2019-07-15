import React, { useState } from "react"
import { Button, Typography } from "../../components"

export default function Profile() {
  const [editView, toggleEditView] = useState(false)
  function toggleEdit() {
    toggleEditView(!editView)
  }
  return (
    <div>
      <Typography text="Profile Page" type="h2" />
      <Button onClick={toggleEdit} text="Edit" type="outlined" />
    </div>
  )
}
