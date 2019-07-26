import React, { useState, useContext } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Chat from '@material-ui/icons/Chat';
import { Navigation, Chats } from '../'
import styles from './styles';
import { ChatsContext } from '../../contexts/ChatsContext';
const AppDrawer = () => {
    const classes = styles();
    const [state, setState] = useState({
        left: false,
        right: false
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
    };
    const { isChatOpen, toggleChatBar } = useContext(ChatsContext)

    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton  onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                            <HomeIcon />
                        </IconButton>
                        <IconButton  onClick={toggleChatBar} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                            <Chat />
                        </IconButton>
                        <Typography align="center" variant="h3" className={classes.root}>
                            YGO TRADE HUB
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                <Navigation toggleDrawer={toggleDrawer} side='left' />
            </Drawer>
            <Drawer anchor="right" open={isChatOpen} onClose={toggleChatBar}>
                <Chats toggleDrawer={toggleDrawer} side='left' />
            </Drawer>
        </div>
    );
}

export default AppDrawer;