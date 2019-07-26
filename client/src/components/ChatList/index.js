import React, { useContext } from 'react'
import styles from './styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { User } from '../../api/'
import { ChatsContext } from '../../contexts/ChatsContext';
const ChatList = () => {
    const classes = styles();
    const { chats, changeRoom } = useContext(ChatsContext)
    return (
        <List>
            {(chats.length)
                ? chats.map((elem, i) => {
                    
                    const user = elem.users.filter(user => user._id !== User.getUser().id)
                    return (
                        <ListItem onClick={() =>changeRoom(i)} key={i}>
                            <ListItemAvatar>
                                <Avatar src={user[0].picture} />
                            </ListItemAvatar>
                            <ListItemText primary={user[0].name} />
                            {(i < chats.length - 1) ? <Divider /> : ""}
                        </ListItem>
                    )
                }
                )
                : ""
            }
        </List>
    );
}
export default ChatList;