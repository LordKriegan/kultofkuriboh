import React from "react"
import Card from "@material-ui/core/Card"
import styles from "./styles"

export default ({ children }) => {
  const classes = styles()
  return <Card className={classes.card}>{children}</Card>
}
