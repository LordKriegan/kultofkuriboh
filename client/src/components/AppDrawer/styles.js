import { makeStyles, createStyles } from "@material-ui/core/styles"

export default makeStyles(theme =>
    createStyles({
        btn: {
            top: "-50"
        },
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2)
        }
    })
)
