import React from "react"
import Button from "@material-ui/core/Button"
import styles from "./styles"

export default ({ text, onClick, type }) => {
  const classes = styles()
  return (
    <Button className={`${classes.button} ${classes[type]}`} onClick={onClick} variant={type}>
      {text}
    </Button>
  )
}
