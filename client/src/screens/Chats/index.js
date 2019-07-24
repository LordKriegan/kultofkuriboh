import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Paper from '@material-ui/core/Paper';
import { User } from '../../api/';
import styles from './styles';
const Chats = () => {
    const classes = styles();
    const [chatList, setChatList] = useState({
        open: false,
        chats: []
    })
    useEffect(() => {
        User
            .getChats()
            .then(response => {
                console.log(response.data);
                setChatList({
                    ...chatList,
                    chats: response.data
                })
            })
            .catch(err => console.error(err));
    }, [])
    const toggleChatMenu = () => {
        setChatList({
            ...chatList,
            open: !chatList.open
        });
    }
    return (
        <Paper className={classes.paper}>
            <IconButton onClick={toggleChatMenu} className={classes.chatButton}>
                {
                    (chatList.open) 
                        ? <ChevronRight />
                        : <Menu />
                }
            </IconButton>
        </Paper>
    );
}

export default Chats;