import React from "react"
import Typography from "@material-ui/core/Typography"
import styles from "./styles"

export default ({ text, type }) => {
  const classes = styles()
  return (
    <div className={classes.root}>
      <Typography variant={type} gutterBottom>
        {text}
      </Typography>
    </div>
  )
}
