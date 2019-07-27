import { makeStyles, createStyles } from "@material-ui/core/styles"

export default makeStyles(theme =>
  createStyles({
    root: {
      margin: "0 1em",
      width: "100%",
      maxWidth: 500,
      color: "#f7f7f7",
    },
    h5: {
      color: "#d3d3d3",
    },
    h6: {
      color: "#d3d3d3",
    },
  }),
)
