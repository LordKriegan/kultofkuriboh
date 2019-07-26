import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import { ChatList, ChatWindow } from '../';

const ChatBar = (props) => {

    const classes = styles();
    return (
        <Grid
            role="presentation"
            onClick={() => props.toggleDrawer(props.side, false)}
            onKeyDown={() => props.toggleDrawer(props.side, false)}
            spacing={0}
            container
            className={classes.chatbar}
        >
            <Grid item xs={12} className={classes.chatlist}>
                <ChatList />
            </Grid>
            <Grid item xs={12} className={classes.chatwindow}>
                <ChatWindow />
            </Grid>
        </Grid>
    );
}

export default ChatBar;