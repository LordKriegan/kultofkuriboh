import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { User } from '../../api/';
import TextField from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles';
import ReactFileStack from 'filestack-react';
import Button from '@material-ui/core/Button';

const EditProfile = (props) => {
    const classes = styles();
    const { email, name, picture, biography, address } = props.user
    console.log('picture: ', picture)
    const [userData, setUserData] = useState({
        email,
        name,
        picture,
        biography,
        password: "",
        address
    })
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.id]: e.target.value
        })
    }

    const saveUser = () => {
        console.log("saving", userData)
        let newObj = {}
        if (userData.email) newObj.email = userData.email
        if (userData.name) newObj.name = userData.name
        if (picture) newObj.picture = picture
        if (userData.biography) newObj.biography = userData.biography
        if (userData.password) newObj.password = userData.password
        User.updateUser(newObj);
        props.edit();
    }
    
    return (
        <Card className={classes.cardStyle}>
            <CardHeader title="Edit Profile" titleTypographyProps={{ align: "center" }} />
            <CardContent className={classes.profileBody}>
                <ReactFileStack
                    apikey="ACoieJZdQTfSQR8IdgchCz"
                    onSuccess={props.setUserPic}
                    options={{
                        accept: 'image/*',
                        maxFiles: 1,
                        storeTo: {
                            location: 's3'
                        }
                    }}
                    customRender={({onPick}) => <Avatar onClick={onPick} className={classes.avatar} src={picture} />}
                />
                <TextField
                    className={classes.input}
                    id="name"
                    label="Username"
                    placeholder="Username"
                    value={userData.name}
                    onChange={handleChange}
                />
                <TextField
                    className={classes.input}
                    id="email"
                    label="E-mail"
                    placeholder="E-mail"
                    value={userData.email}
                    onChange={handleChange}
                />
                <TextField
                    className={classes.input}
                    id="address"
                    label="Address"
                    placeholder="Address"
                    value={userData.address}
                    onChange={handleChange}
                />
                <TextField
                    className={classes.input}
                    id="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    value={userData.password}
                    onChange={handleChange}
                />
                <TextField
                    className={classes.input}
                    id="biography"
                    label="Biography"
                    placeholder="Enter a short description of yourself."
                    value={userData.biography}
                    onChange={handleChange}
                    multiline
                    inputProps={{maxLength: 500}}
                    rowsMax="4"
                />
            </CardContent>
            <CardActions className={classes.profileActions}>
                <Button variant="contained" onClick={saveUser}>Save Changes</Button>
            </CardActions>
        </Card>
    );
}

export default EditProfile;