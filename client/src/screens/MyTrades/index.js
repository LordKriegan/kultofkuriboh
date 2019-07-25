import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { TradeList } from '../../components/';
import { User, Trade } from '../../api';
const MyTrades = () => {
    const [modalData, setModalData] = useState({
        open: false
    })
    const [tradeData, setTradeData] = useState({
        active: [],
        pending: [],
        completed: []
    })
    useEffect(() => {
        Trade
            .findAllTrades(User.getUser().id)
            .then(response => {
                console.log(response.data)
                setTradeData({
                    ...tradeData,
                    ...response.data
                })
            })
            .catch(err=>console.error(err));
    }, [])

    const openModal = (list, index) => {
        setModalData({
            ...modalData,
            open: true,
            ...tradeData[list][index]
        })
    }
useEffect(() => console.log(modalData), [modalData])
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Active Trades" align="center" />
                    <CardContent>
                        <TradeList showTrade={openModal} listType="active" list={tradeData.active} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Pending Trades" align="center" />
                    <CardContent>
                        <TradeList showTrade={openModal} listType="pending" list={tradeData.pending} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Completed Trades" align="center" />
                    <CardContent>
                        <TradeList showTrade={openModal} listType="completed" list={tradeData.completed} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default MyTrades;