import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { CardSearcher, CardViewer, CardList } from '../../components/';
import { User } from '../../api';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Save from '@material-ui/icons/Save';
import styles from './styles';
const Collection = () => {
    const classes = styles()
    const [cardData, setCardData] = useState({
        cardName: "",
        haves: [],
        wants: []
    });

    useEffect(() => {
        User.getUserData(User.getUser().id)
            .then((resp) => {
                setCardData({
                    ...cardData,
                    haves: [...resp.data.haves],
                    wants: [...resp.data.wants]
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const setCardName = (cardName) => {
        setCardData({ ...cardData, cardName: cardName });
    }

    const saveCollection = () => {
        User.updateCollection(User.getUser().id, cardData.haves, cardData.wants)
            .then((resp) => {
                console.log(resp);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const addToList = (set, name, qty, list) => {
        if (!set || !name || !qty || !list) {
            console.log("cant add to list " + list)
            return
        };
        const newList = [...cardData[list]]
        let found = false;
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].name.toLowerCase() === name.toLowerCase() && newList[i].set.toLowerCase() === set.toLowerCase()) {
                found = true;
                newList[i].quantity = newList[i].quantity + qty;
                break;
            }
        }
        if (!found) {
            newList.push({
                quantity: qty,
                set: set,
                name: name
            });
        }
        setCardData({ ...cardData, [list]: newList })
    }

    const modifyList = (index, amount, list) => {
        let newList = [...cardData[list]];
        newList[index].quantity = amount;
        setCardData({ ...cardData, [list]: newList })
    }
    const removeFromList = (index, list) => {
        setCardData(prevState=> {
            let newList = prevState[list];
            newList.splice(index, 1);
            return { ...prevState, [list]: newList }
        });
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={5} className={classes.searcher}>
                <CardSearcher searchType="cards" changeCard={setCardName} addToList={addToList} />
            </Grid>
            <Grid item xs={12} md={7} className={classes.searcher}>
                <Grid item xs={12} className={classes.viewer}>
                    <CardViewer cardName={cardData.cardName} />
                </Grid>
                <Grid item xs={12} className={classes.collection}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <CardList removeFromList={removeFromList} listType="haves" modifyList={modifyList} editable={true} setCardName={setCardName} title="Haves" list={cardData.haves} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CardList removeFromList={removeFromList} listType="wants" modifyList={modifyList} editable={true} setCardName={setCardName} title="Wants" list={cardData.wants} />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                        <IconButton onClick={saveCollection} start="edge" color="primary" aria-label="Save Collection">
                                <Save />
                            </IconButton>
                        </CardActions>
                    </Card>

                </Grid>
            </Grid>
        </Grid>
    );
}

export default Collection;

