import { makeStyles, createStyles } from '@material-ui/core/styles';

export default makeStyles(themes =>
    createStyles({
        searcher: {
            height: "90vh",
            overflowY: "auto",
            [themes.breakpoints.down("sm")]: {
                height: "45vh"
            }
        },
        viewer: {
            height: "45%",
            overflowY: "auto"
        },
        userlist: {
            height: "55%",
            overflowY: "auto"
        }
    }))