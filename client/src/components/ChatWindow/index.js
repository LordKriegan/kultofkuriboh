import React, { useContext, useState } from 'react';
import { ChatsContext } from '../../contexts/ChatsContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Send from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import styles from './styles';
import { User } from '../../api/';
const ChatWindow = () => {
    const [message, setMesssage] = useState("")
    const handleInputChange = (e) => setMesssage(e.target.value)
    const { chats, currRoomIndex, sendNewMsg } = useContext(ChatsContext);
    const classes = styles();
    
    return (
        <>
            <List className={classes.chatWindow}>
                {chats.length && chats[currRoomIndex]["messages"].length
                    ? chats[currRoomIndex]["messages"].map((elem, i) => {
                        const myId = User.getUser().id
                        const myMsg = (elem.from._id === myId)
                        return (
                            <ListItem key={i}>
                                <ListItemAvatar className={myMsg ? classes.myMsg : classes.theirMsg }>
                                    <Avatar src={myMsg ? elem.from.picture : elem.to.picture } />
                                </ListItemAvatar>
                                <ListItemText primaryTypographyProps={{variant: "subtitle2"}} primary={elem.message} secondary={(myMsg ? elem.from.name : elem.to.name)}/>
                            </ListItem>
                        )
                    })
                    : ""
                }
            </List>
            <TextField
                className={classes.inputBar}
                variant="filled"
                onChange={handleInputChange} 
                value={message}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={() => sendNewMsg(chats[currRoomIndex].users.filter(elem => elem._id !== User.getUser().id)[0], message)}
                            >
                                <Send />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </>
    );
}

export default ChatWindow;