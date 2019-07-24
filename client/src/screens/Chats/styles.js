import { makeStyles, createStyles } from "@material-ui/core/styles"

export default makeStyles(theme =>
  createStyles({
    paper: {
        position: "relative",
        height: "100%",
        width: "100%"
    },
    chatButton: {
        position: "absolute",
        top: 0,
        right: 0
    }
  })
)
