import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { Trade, User } from '../../api/';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles';
const TradeMgr = (props) => {
    const classes = styles();
    const [tradeData, setTradeData] = useState({
        myData: {},
        theirData: {},
        acceptStatus: '',
        id: '',
        sentBy: ''
    })
    useEffect(() => {
        if (props.tradeId) {
            Trade.findOneTrade(props.tradeId)
                .then(response => {
                    setTradeData({
                        ...tradeData,
                        id: response.data._id,
                        sentBy: response.data.sentBy,
                        acceptStatus: response.data.accepted,
                        myData: (response.data.reciever.userId._id === User.getUser().id) ? response.data.reciever : response.data.sender,
                        theirData: (response.data.reciever.userId._id === User.getUser().id) ? response.data.sender : response.data.reciever
                    })
                })
                .catch(err => console.error(err));
        }
    }, [])
    useEffect(() => console.log(tradeData), [tradeData])
    const markAcceptStatus = (accepted) => {
        Trade
            .markAcceptStatus(tradeData.id, accepted)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((err) => console.error(err));
    }
    const markRecievedStatus = (recieved) => {
        Trade
            .markRecievedStatus(tradeData.id, (tradeData.sentBy === tradeData.myData.userId._id), recieved)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch(err=>console.error(err))
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                {(tradeData.myData.userId)
                    ? <Card>
                        <CardHeader title={tradeData.myData.userId.name} subheader={tradeData.myData.userId.rating} avatar={<Avatar src={tradeData.myData.userId.picture} />} />
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Set</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(tradeData.myData.cards.map((elem, i) =>
                                        <TableRow key={i}>
                                            <TableCell>{elem.set}</TableCell>
                                            <TableCell>{elem.name}</TableCell>
                                            <TableCell>{elem.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    : "Loading Data..."}
            </Grid>
            <Grid item xs={12} md={6}>
                {(tradeData.theirData.userId)
                    ? <Card>
                        <CardHeader title={tradeData.theirData.userId.name} subheader={tradeData.theirData.userId.rating} avatar={<Avatar src={tradeData.theirData.userId.picture} />} />
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Set</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(tradeData.theirData.cards.map((elem, i) =>
                                        <TableRow key={i}>
                                            <TableCell>{elem.set}</TableCell>
                                            <TableCell>{elem.name}</TableCell>
                                            <TableCell>{elem.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    : "Loading Data..."}
            </Grid>
            {(tradeData.acceptStatus === "accept")
                ? <Grid item xs={12}>
                    <Typography align="center" variant="h4">Send cards to: {tradeData.theirData.userId.address}</Typography>
                </Grid>
                : ""
            }

            {(tradeData.acceptStatus === "pending")
                ? <Grid item xs={12}>
                    <Button onClick={()=>markAcceptStatus(true)} variant="outlined" className={classes.button}>Accept</Button>
                    <Button onClick={()=>markAcceptStatus(false)}variant="outlined" className={classes.button}>Reject</Button>
                </Grid>
                : ""
            }
            {(tradeData.acceptStatus === "accept" && tradeData.myData.recieved === "pending")
                ? <Grid item xs={12}>
                    <Button onClick={()=>markRecievedStatus(true)} variant="outlined" className={classes.button}>Recieved</Button>
                    <Button onClick={()=>markRecievedStatus(false)} variant="outlined" className={classes.button}>Not Recieved</Button>
                </Grid>
                : ""
            }
        </Grid>
    );
}

export default TradeMgr;