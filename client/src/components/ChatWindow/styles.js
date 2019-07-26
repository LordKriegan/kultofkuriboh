import { makeStyles, createStyles } from '@material-ui/core/styles';

export default makeStyles(theme =>
  createStyles({
    chatWindow: {
        height: "80%",
        display: "flex",
        flexDirection: "column",
        overflowY: 'scroll',
        position: "relative"
    },
    inputBar: {
        position: 'absolute',
        bottom: 0
    },
    myMsg: {
        flexOrder: 1
    },
    theirMsg: {
        flexOrder: 2
    }
  })
)
