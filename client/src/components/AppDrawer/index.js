import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Chat from '@material-ui/icons/Chat';
import { Navigation, Chats } from '../'
const useStyles = makeStyles(theme => ({
    btn: { 
        top: "-50"
    },
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));

const AppDrawer = () => {
    const classes = useStyles();
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

    return (
        <div>
            {/* <NavigateNext styles={classes.btn} onClick={toggleDrawer('left', true)}/> */}
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton  onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                            <HomeIcon />
                        </IconButton>
                        <IconButton  onClick={toggleDrawer('right', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
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
            <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
                <Chats toggleDrawer={toggleDrawer} side='left' />
            </Drawer>
        </div>
    );
}

export default AppDrawer;