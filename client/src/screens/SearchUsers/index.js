import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { CardSearcher, CardViewer, UserList } from '../../components';
import { User } from '../../api';
import styles from './styles.js';
const SearchUsers = () => {
    const classes = styles();
    const [cardData, setCardData] = useState({
        set: "",
        name: ""
    })
    const [userResults, setUserResults] = useState([]);
    const [modalData, setModalData] = useState({
        open: false,
        myCards: [],
        theirCards: []
    })

    const toggleModal = () => {
        setModalData({
            ...modalData,
            open: !modalData.open
        })
    }

    const searchHaves = () => {
        User
            .findHaves(cardData.set, cardData.name)
            .then(response => {
                console.log(response.data)
                setUserResults(response.data)
            })
            .catch(err => {
                console.error(err);
            });
    };
    const searchWants = () => {
        User
            .findWants(cardData.set, cardData.name)
            .then(response => {
                setUserResults(response.data)
            })
            .catch(err => {
                console.error(err);
            });
    };

    const setCard = (cardName) => {
        setCardData({
            ...cardData,
            name: cardName
        });
    }
    const setSet = (set) => {
        setCardData({
            ...cardData,
            set: set
        });
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
                <CardSearcher changeSet={setSet} searchType="users" changeCard={setCard} searchHaves={searchHaves} />
            </Grid>
            <Grid item xs={12} md={7}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CardViewer cardName={cardData.name} />
                    </Grid>
                    <Grid item xs={12}>
                        <UserList list={userResults} />
                    </Grid>
                </Grid>
            </Grid>
            <Modal
                aria-labelledby="trade-box"
                aria-describedby="where the trades are built"
                open={modalData.open}
                onClose={toggleModal}
            >
                <div className={classes.paper}>
                    Lorem Ipsum Delor BLAH BLAH BLAHmo
                </div>
            </Modal>
        </Grid>
    );
}

export default SearchUsers;