import { makeStyles, createStyles } from "@material-ui/core/styles"

export default makeStyles(theme =>
  createStyles({
    button: {
      color: "#d3d3d3",
      margin: "1em",
    },
    contained: {
      backgroundColor: "#da2777",
      "&:hover": {
        backgroundColor: "#f91c7f",
      },
    },
    outlined: {
      border: "2px solid #da2777",
      color: "#da2777",
    },
  }),
)
