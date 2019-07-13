import { makeStyles, createStyles } from "@material-ui/core/styles"

export default makeStyles(theme =>
  createStyles({
    button: {
      margin: "1em",
    },
    primary: {
      backgroundColor: "blue",
      color: "white",
    },
    outlined: {
      backgroundColor: "transparent",
      border: "1px solid blue",
    },
  }),
)
