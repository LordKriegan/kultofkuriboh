//react
import React, { useEffect, useState } from 'react';
//material-ui components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
//api
import { YgoDb } from '../../api';
const CardViewer = (props) => {
    const [card, setCardInfo] = useState({
        info: ''
    });
    useEffect(() => {
        if (props.cardName) {
            YgoDb.cardInfo(props.cardName)
                .then((response) => {
                    setCardInfo({
                        ...card,
                        info: response.data
                    })
                })
                .catch((err) => {
                    console.error(err)
                });
        }
    }, [props.cardName])

    return (
        (props.cardName)
            ? <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={9}>
                            {(card.info)
                                ? <>
                                    <h3>{card.info.name}</h3>
                                    {(card.info.family) ? <p>Attribute: {card.info.family}</p> : ""}
                                    <p>Type: {card.info.type}</p>
                                    {(card.info.property) ? <p>Property: {card.info.property}</p> : ""}
                                    {(card.info.level) ? <p>Level/Rank/Link Rating: {card.info.level}</p> : ""}
                                    {(card.info.atk) ? <p>ATK: {card.info.atk}</p> : ""}
                                    {(card.info.def) ? <p>DEF: {card.info.def}</p> : ""}
                                </>
                                : ""}
                        </Grid>
                        <Grid item xs={3}>
                            <CardMedia component="img" src={"http://yugiohprices.com/api/card_image/" + props.cardName} />
                        </Grid>
                        <Grid item xs={12}>
                            {(card.info) ? <p>Text: {card.info.text}</p> : ""}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            : <Card>
                <CardContent>Click on a Card!</CardContent>
            </Card>

    );
}

export default CardViewer;