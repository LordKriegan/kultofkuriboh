import React from "react"
import TextField from "@material-ui/core/TextField"
import styles from "./styles"

export default ({ id, label }) => {
  const classes = styles()
  return <TextField className={classes.textField} id={id} label={label} margin="dense" />
}
