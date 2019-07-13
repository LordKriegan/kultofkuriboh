import { makeStyles, createStyles } from "@material-ui/core/styles"

export default makeStyles(theme =>
  createStyles({
    textField: {
      display: "block",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
)
