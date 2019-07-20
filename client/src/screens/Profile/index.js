import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import styles from "./styles.js";
const Profile = (props) => {
    useEffect(() => {
        if (props.location.query.id) {
            alert("YAAAASH!");
        } else {
            alert ("NUUUUUU")
        }
    },[])
    const classes = styles();
    return (
        <Grid className={classes.container} style={{ color: "white" }} container spacing={2}>
            <Grid className={classes.haves} item xs={12} md={4}>
                Haves
            </Grid>
            <Grid className={classes.profile} item xs={12} md={4}>
                Profile
            </Grid>
            <Grid className={classes.wants} item xs={12} md={4}>
                Wants
            </Grid>
        </Grid>
    );
}

export default Profile;