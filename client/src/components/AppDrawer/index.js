import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNext from '@material-ui/icons/NavigateNext';
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    btn: {
      
        top: "-50"
    }
});

const AppDrawer = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
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
            <NavigateNext styles={classes.btn} onClick={toggleDrawer('left', true)}/>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}

export default AppDrawer;