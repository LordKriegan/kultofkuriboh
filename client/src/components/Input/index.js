import React from "react"
import TextField from "@material-ui/core/TextField"
import styles from "./styles"

export default ({ id, label, onChange, value }) => {
  const classes = styles()
  return (
    <TextField
      className={classes.textField}
      id={id}
      label={label}
      onChange={onChange}
      value={value}
    />
  )
}
