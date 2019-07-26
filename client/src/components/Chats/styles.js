import { makeStyles, createStyles } from "@material-ui/core/styles"

export default makeStyles(theme =>
  createStyles({
    chatbar: {
      width: 250
    },
    chatlist: {
      minHeight: "60vh",
      overflowY: "scroll"
    },
    chatwindow: {
      height: "40vh"
    }
  })
)
