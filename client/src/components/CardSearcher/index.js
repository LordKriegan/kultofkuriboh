//react
import React, { useState } from 'react';
//material-ui components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from "@material-ui/core/TextField"
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment';
//material-ui icons
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove';

//api
import { YgoDb } from '../../api'

const CardSearcher = (props) => {
    const [cards, setCards] = useState({
        set: "",
        quantity: 1,
        cardName: "",
        cardList: "",
        selectedCard: ""
    });

    const highlightRow = (id, set) => {
        setCards({
            ...cards,
            selectedCard: id,
            set
        })
        if (props.changeSet) props.changeSet(set)
    }

    const updateInput = ({ target: { id, value } }) => {
        setCards({ ...cards, [id]: value })
    }
    const searchCard = (e) => {
        e.preventDefault()
        YgoDb.cardSets(cards.cardName)
            .then((resp) => {
                if (resp.data.length) {
                    let newObj = { ...cards, cardList: resp.data };
                    if (resp.data.length === 1) {
                        newObj.selectedCard = 0;
                        newObj.set = resp.data[0].print_tag
                        if (props.changeSet) {
                            props.changeSet(resp.data[0].print_tag)
                        }
                    }
                    setCards(newObj);
                    props.changeCard(cards.cardName)
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }
    const getPrice = (elem, range) => {
        if (elem.price_data.status === "success") {
            return `$${elem.price_data.data.prices[range].toFixed(2)}`;
        } else {
            return "N/A";
        }
    }
    return (
        <Grid container spacing={2} >
            <Grid item xs={12}>

                <FormGroup>
                    <Box display="flex" flexDirection="row">
                        <TextField
                            style={{ width: "100%" }}
                            id="cardName"
                            label="Card Name"
                            onChange={updateInput}
                            value={cards.cardName}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={searchCard} start="edge" color="primary" aria-label="Search Card">
                                            <Search />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                    </Box>
                </FormGroup>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        {(cards.cardList)
                            ? <Table padding="none">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Print Tag</TableCell>
                                        <TableCell>Rarity</TableCell>
                                        <TableCell>Low</TableCell>
                                        <TableCell>Average</TableCell>
                                        <TableCell>High</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cards.cardList.map((elem, i) => {
                                        return (
                                            <TableRow onClick={() => highlightRow(i, elem.print_tag)} selected={cards.selectedCard === i} id={i} key={i}>
                                                <TableCell>{elem.print_tag}</TableCell>
                                                <TableCell>{elem.rarity}</TableCell>
                                                <TableCell>{getPrice(elem, "low")}</TableCell>
                                                <TableCell>{getPrice(elem, "average")}</TableCell>
                                                <TableCell>{getPrice(elem, "high")}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            : "Search for a card!"}
                    </CardContent>
                    {(cards.cardList)
                        ? (props.searchType === "cards")
                            ? <CardActions>
                                <Button onClick={() => props.addToList(cards.set, cards.cardName, cards.quantity, "haves")} variant="contained" color="primary">Haves</Button>
                                <IconButton onClick={() => setCards({ ...cards, quantity: (cards.quantity > 1) ? cards.quantity - 1 : 1 })} start="edge" color="primary" aria-label="Decrement Quantity">
                                    <Remove />
                                </IconButton>
                                <span>{cards.quantity}</span>
                                <IconButton onClick={() => setCards({ ...cards, quantity: cards.quantity + 1 })} start="edge" color="primary" aria-label="Increment Quantity">
                                    <Add />
                                </IconButton>
                                <Button onClick={() => props.addToList(cards.set, cards.cardName, cards.quantity, "wants")} variant="contained" color="primary">Wants</Button>
                            </CardActions>
                            : <CardActions>
                                <Button onClick={props.searchHaves} variant="contained" color="primary">Haves</Button>
                                <Button onClick={props.searchWants} variant="contained" color="primary">Wants</Button>
                            </CardActions>
                        : ""}
                </Card>
            </Grid>
        </Grid>
    );
}

export default CardSearcher;