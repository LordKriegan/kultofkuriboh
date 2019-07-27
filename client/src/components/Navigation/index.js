import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styles from './styles';
const Navigation = props => {
    const classes = styles();
    return (
        <div
            className={classes.list}
            role="presentation"
            onClick={()=>props.toggleDrawer(props.side, false)}
            onKeyDown={()=>props.toggleDrawer(props.side, false)}
        >
            <List>
                <ListItem button>
                    <Link to="/collection">
                        <ListItemText primary={"Haves/Wants"} />
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link to="/mytrades">
                        <ListItemText primary={"My Trades"} />
                    </Link>
                </ListItem>
                <ListItem button>
                    <Link to="/findusers">
                        <ListItemText primary={"Browse"} />
                    </Link>
                </ListItem>
                <Divider />
                <ListItem button>
                    <Link to="/profile">
                        <ListItemText primary={"My Profile"} />
                    </Link>
                </ListItem>
            </List>
        </div>
    );
}

export default Navigation