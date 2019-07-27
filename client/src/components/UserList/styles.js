import { makeStyles, createStyles } from "@material-ui/core/styles"
import { flexbox } from "@material-ui/system";

export default makeStyles(theme =>
  createStyles({
    userActions: {
        display: "flex",
        flexDirection: "row"
    }
  })
)
