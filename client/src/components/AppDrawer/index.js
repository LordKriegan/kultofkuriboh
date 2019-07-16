import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home'
const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
    },
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
        left: false
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem button>
                    <Link to="/collection">
                        <ListItemText primary={"Haves/Wants"} />
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link to="/trades">
                        <ListItemText primary={"My Trades"} />
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link to="/browse">
                        <ListItemText primary={"Browse"} />
                    </Link>
                </ListItem>
                <Divider />
                <ListItem button>
                    <Link to="/profile">
                        <ListItemText primary={"My Profile"} />
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link to="/messages">
                        <ListItemText primary={"Messages"} />
                    </Link>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            {/* <NavigateNext styles={classes.btn} onClick={toggleDrawer('left', true)}/> */}
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                            <HomeIcon onClick={toggleDrawer('left', true)}/>
                        </IconButton>
                        <Typography align="center" variant="h3" className={classes.root}>
                            YGO TRADE HUB
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}

export default AppDrawer;