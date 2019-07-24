import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import queryStr from 'query-string';
import { CardList, ViewProfile, EditProfile } from '../../components';
import { User } from '../../api/';
import styles from "./styles.js";
const Profile = (props) => {
    const [userData, setUserData] = useState({
        email: "",
        haves: [],
        wants: [],
        name: "",
        picture: "",
        rating: ""
    });
    const [loaded, setLoadedFlag] = useState(false);
    const [editUser, setEditUserFlag] = useState(false);
    useEffect(() => {
        let query = queryStr.parse(props.location.search);
        let uId = (query.id) ? query.id : User.getUser().id;
        User.findOne(uId)
            .then(({ data }) => {
                setUserData({
                    ...userData,
                    email: data.email,
                    haves: data.haves,
                    wants: data.wants,
                    name: data.name,
                    address: data.address,
                    picture: data.picture,
                    rating: data.rating,
                    biography: data.biography,
                    userId: uId
                })
                setLoadedFlag(true)
            })
            .catch(err => console.error(err));
    }, []);
    const toggleEdit = () => {
        setEditUserFlag(!editUser)
    }
    const setUserPic = (result) => {
        if (result.filesFailed.length) {
            console.error("Failed to upload image.");
        } else {
            setUserData({
                ...userData,
                picture: result.filesUploaded[0].url
            })
            console.log(result.filesUploaded[0].url)
            console.log("Changing user pic");
        }
    }
    const classes = styles();
    return (
        <Grid className={classes.container} style={{ color: "white" }} container spacing={2}>
            <Grid className={classes.haves} item xs={12} md={4}>
                <CardList editable={false} list={userData.haves} title="Haves" />
            </Grid>
            <Grid className={classes.profile} item xs={12} md={4}>
                {(loaded)
                    ? (editUser) 
                        ? <EditProfile edit={toggleEdit} setUserPic={setUserPic} user={userData} />
                        : <ViewProfile edit={toggleEdit} user={userData} /> 
                    : ""}
            </Grid>
            <Grid className={classes.wants} item xs={12} md={4}>
                <CardList editable={false} list={userData.wants} title="Wants" />
            </Grid>
        </Grid>
    );
}

export default Profile;