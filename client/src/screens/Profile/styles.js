import {makeStyles, createStyles} from '@material-ui/core/styles';

export default makeStyles(themes => 
    createStyles({
        container: {
            display: "flex"
        },
        haves: {
            order: 1,
            [themes.breakpoints.down("sm")]: {
                order: 2
            }
        },
        profile: {
            order: 2,
            [themes.breakpoints.down("sm")]: {
                order: 1
            }
        },
        wants: {
            order: 3
        }
    }))