import { makeStyles, createStyles } from "@material-ui/core/styles"

export default makeStyles(theme =>
  createStyles({
    chatbar: {
      width: 250,
      overflow: 'hidden'
    },
    chatlist: {
      minHeight: "50vh",
      overflowY: "scroll",
    },
    chatwindow: {
      minHeight: "50vh",
    }
  })
)
