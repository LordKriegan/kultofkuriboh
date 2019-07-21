import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import queryStr from 'query-string';
import CardList from '../../components/CardList';
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
    })

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
                    picture: data.picture,
                    rating: data.rating
                })
            })
            .catch(err => console.error(err));
    }, [])
    const classes = styles();
    return (
        <Grid className={classes.container} style={{ color: "white" }} container spacing={2}>
            <Grid className={classes.haves} item xs={12} md={4}>
                <CardList editable={false} list={userData.haves} title="Haves" />
            </Grid>
            <Grid className={classes.profile} item xs={12} md={4}>
                Profile
            </Grid>
            <Grid className={classes.wants} item xs={12} md={4}>
                <CardList editable={false} list={userData.wants} title="Wants" />
            </Grid>
        </Grid>
    );
}

export default Profile;