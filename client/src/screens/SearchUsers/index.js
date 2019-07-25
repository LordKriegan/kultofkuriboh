import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {CardSearcher, CardViewer, UserList} from '../../components';
import { User } from '../../api';

const SearchUsers = () => {
    const [cardData, setCardData] = useState({
        set: "",
        name: ""
    })
    const [userResults, setUserResults] = useState([]);

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

    return(
        <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
                <CardSearcher changeSet={setSet} searchType="users" changeCard={setCard} searchHaves={searchHaves} searchWants={searchWants} />
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
        </Grid>
    );
}

export default SearchUsers;