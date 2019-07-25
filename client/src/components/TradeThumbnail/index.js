import React from 'react';
import { User } from '../../api/';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const TradeThumbnail = (props) => {
    const bool = props.reciever.userId._id === User.getUser().id;
    const myData = (bool) ? props.reciever : props.sender;
    const partnerData = (bool) ? props.sender : props.reciever;
    // if (props.reciever.userId._id === User.getUser().id) {
    //     myData = props.reciever;
    //     partnerData = props.sender;
    // } else {
    //     myData = props.sender;
    //     partnerData = props.reciever;
    // }

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Card style={{border: "3px solid black"}} raised={true}>
                    <CardHeader avatar={<Avatar src={partnerData.userId.picture} />} title={partnerData.userId.name} subheader={partnerData.userId.rating} />
                    <CardContent>
                        <Grid container spacing={0}>
                            <Grid item xs={6}>
                                <Card>
                                    <ul style={{ listStyleType: "none" }}>
                                        {myData.cards.slice(0, 3).map((elem, i) => <li key={i}>{`${elem.quantity}x ${elem.name}`}</li>)}
                                    </ul>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card>
                                    <ul style={{ listStyleType: "none" }}>
                                        {partnerData.cards.slice(0, 3).map((elem, i) => <li key={i}>{`${elem.quantity}x ${elem.name}`}</li>)}
                                    </ul>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TradeThumbnail;