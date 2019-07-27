import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import { User } from '../../api/';
import { Link } from 'react-router-dom';
import { ChatsContext } from '../../contexts/ChatsContext';

const ViewProfile = (props) => {
    const { email, name, picture, rating, biography, userId } = props.user
    const classes = styles();
    const { createNewChat } = useContext(ChatsContext)
    return (
        <Card style={{height: "100%", overflowY: "auto"}}>
            <CardHeader title={name} titleTypographyProps={{ align: "center" }} />
            <CardContent className={classes.profileBody}>
                <Avatar className={classes.avatar} src={picture} />
                <Typography>{email}</Typography>
                <Typography>Rating: {rating}</Typography>
                <Typography>{biography}</Typography>
            </CardContent>
            <CardActions className={classes.profileActions}>
                {(userId === User.getUser().id)
                    ? <Button variant="contained" onClick={props.edit}>Edit</Button>
                    : <>
                        <Link to={"/trade?id=" + userId}><Button variant="contained">Trade</Button></Link>
                        <Button onClick={() => createNewChat(userId)} variant="contained">Chat</Button>
                    </>}
            </CardActions>
        </Card>
    );
}

export default ViewProfile;