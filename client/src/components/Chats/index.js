import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import { User } from '../../api/';
import ChatList from '../';

const ChatBar = (props) => {
    const [chatData, setChatData] = useState({})
    useEffect(() => {
        User
            .findChats(User.getUser().id)
            .then((response) => {
                console.log(response.data);
            })
            .catch(err=>console.error(err));
    }, [])
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
                test
            </Grid>
            <Grid item xs={12} className={classes.chatwindow}>
                test
            </Grid>
        </Grid>
    );
}

export default ChatBar;