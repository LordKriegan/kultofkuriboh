import { makeStyles, createStyles } from '@material-ui/core/styles';

export default makeStyles(theme =>
    createStyles({
        profileBody: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        },
        input: {
            width: "100%"
        },
        avatar: {
            height: "100px",
            width: "100px",
            [theme.breakpoints.down("sm")]: {
                height: "50px",
                width: "50px"
            }
        },
        profileActions: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        cardStyle: {
            height: "100%",
            overflowY: "auto"
        }
    })
  );