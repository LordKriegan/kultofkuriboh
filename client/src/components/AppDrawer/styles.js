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
        },
        appbar: {
            background: "linear-gradient(to bottom, #7d7e7d 0%,#0e0e0e 100%)"
        }
    })
)
