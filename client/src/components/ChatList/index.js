import React, { useState, useEffect } from 'react'
import styles from './styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
const ChatList = (props) => {
    const classes = styles();
    return (
        <List>
            {(props.list.length)
                ? props.list.map((elem, i) =>
                    <ListItem key={i}>
                        <ListItemText><Avatar src="" />Name Here</ListItemText>
                        {(i < props.list.length - 1) ? <Divider /> : ""}
                    </ListItem>)
                : ""
            }
        </List>
    );
}
export default ChatList;