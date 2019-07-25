import { makeStyles, createStyles } from "@material-ui/core/styles"

export default makeStyles(theme =>
  createStyles({
    paper: {
        position: 'absolute',
        width: "50%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4),
        outline: 'none',
        top: "25%",
        left: "25%"
      }
  })
)
