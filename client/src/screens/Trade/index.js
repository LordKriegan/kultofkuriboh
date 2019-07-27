import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import queryStr from 'query-string';
import axios from 'axios';
import { User, Trade } from '../../api/';
import { TradeBuilder } from '../../components';
import styles from './styles';
import Button from '@material-ui/core/Button';

export default function TradeScreen(props) {
  const classes = styles();
  const [mySide, setMySide] = useState({
    id: '',
    name: '',
    picture: '',
    haves: [],
    offer: [],
    rating: '',
  });
  const [theirSide, setTheirSide] = useState({
    id: '',
    name: '',
    picture: '',
    haves: [],
    offer: [],
    rating: '',
  });
  useEffect(() => {
    const query = queryStr.parse(props.location.search);
    if (!query.id) props.history.push("/findusers")
    else {
      axios
        .all([User.findOne(User.getUser().id), User.findOne(query.id)])
        .then(response => {
          console.log(response[0].data.picture)
          setMySide({
            ...mySide,
            id: response[0].data._id,
            name: response[0].data.name,
            picture: response[0].data.picture,
            rating: response[0].data.rating,
            haves: [...response[0].data.haves].map((e => ({...e, max: e.quantity})))
          })
          setTheirSide({
            ...theirSide,
            id: response[1].data._id,
            name: response[1].data.name,
            picture: response[1].data.picture,
            rating: response[1].data.rating,
            haves: [...response[1].data.haves].map((e => ({...e, max: e.quantity})))
          })
        })
        .catch(err => console.error(err));
    }
  }, []);


  const moveToHaves = (side, index) => {
    const cb = prevState => {
      let newOffer = [...prevState.offer]
      let newHaves = [...prevState.haves]
      if (newHaves.filter(e=> e.set === newOffer[index].set && e.name === newOffer[index].name).length) {
        for (let i = 0; i < newHaves.length; i++) {
          if(newHaves[i].set === newOffer[index].set && newHaves[i].name === newOffer[index].name) {
            if (newHaves[i].quantity < newOffer[index].max) {
              newHaves[i].quantity += 1;
              newOffer[index].quantity -= 1;
            }
            break;
          }
        }
      } else {
        newHaves.push({...newOffer[index], quantity: 1})
        newOffer[index].quantity -= 1
      }
      if (!newOffer[index].quantity) newOffer.splice(index, 1)
      let newObj = {
        ...prevState,
        haves: newHaves,
        offer: newOffer
      };
      console.log(newObj)
      return newObj;
    }
    if (side === "mine") {
      setMySide(cb)
    } else {
      setTheirSide(cb)
    }
  }

  const handleSubmission = () => {
    if (!mySide.offer.length || !theirSide.offer.length) {
      alert("Please add cards to the list. No freebies here!");
      return;
    }
    Trade.postNewTrade({
      cards: [...mySide.offer],
      id: mySide.id
    }, {
      cards: [...theirSide.offer],
      id: theirSide.id
    }).then(response => {
      console.log(response.data)
    }).catch(err => console.error(err))
  }

  const moveToOffer = (side, index) => {
    const cb = prevState => {
      let newOffer = [...prevState.offer]
      let newHaves = [...prevState.haves]
      if (newOffer.filter(e=> e.set === newHaves[index].set && e.name === newHaves[index].name).length) {
        for (let i = 0; i < newOffer.length; i++) {
          if(newOffer[i].set === newHaves[index].set && newOffer[i].name === newHaves[index].name) {
            if (newOffer[i].quantity < newHaves[index].max) {
              newOffer[i].quantity += 1;
              newHaves[index].quantity -= 1;
            }
            break;
          }
        }
      } else {
        newOffer.push({...newHaves[index], quantity: 1})
        newHaves[index].quantity -= 1
      }
      if (!newHaves[index].quantity) newHaves.splice(index, 1)
      let newObj = {
        ...prevState,
        offer: newOffer,
        haves: newHaves
      };
      console.log(newObj)
      return newObj;
    }
    if (side === "mine") {
      setMySide(cb)
    } else {
      setTheirSide(cb)
    }
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TradeBuilder {...mySide} side="mine" moveToOffer={moveToOffer} moveToHaves={moveToHaves} />
      </Grid>
      <Grid item xs={12}>
        <TradeBuilder {...theirSide} side="theirs" moveToOffer={moveToOffer} moveToHaves={moveToHaves} />
      </Grid>
      <Grid className={classes.buttonBox} item xs={12}>
        <Button onClick={handleSubmission} variant="contained">Submit Trade</Button>
      </Grid>
    </Grid>
  )
}
