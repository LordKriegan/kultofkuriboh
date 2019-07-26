import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { TradeList, TradeMgr } from '../../components/';
import { User, Trade } from '../../api';
import Modal from '@material-ui/core/Modal';
import styles from './styles';
const MyTrades = (props) => {
    const classes = styles();
    const [modalData, setModalData] = useState({
        open: false,
        tradeId: ''
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
            .catch(err => console.error(err));
    }, [])

    const openModal = (list, index) => {
        setModalData({
            ...modalData,
            open: true,
            tradeId: tradeData[list][index]._id
        })
    }

    const closeModal = () => {
        setModalData({
            ...modalData,
            open: false
        })
    }

    return (
        <>
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
            <Modal
                aria-labelledby="Trade Manager"
                aria-describedby="Manage a trade"
                open={modalData.open}
                onClose={closeModal}
            >
                <div className={classes.paper}>
                   <TradeMgr tradeId={modalData.tradeId} /> 
                </div>
                
            </Modal>
        </>
    );
}

export default MyTrades;