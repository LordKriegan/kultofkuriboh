import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import styles from './styles';
import { TradeThumbnail } from '../';
const TradeList = (props) => {
    const classes = styles();
    return(
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {(props.list.length)
                    ? props.list.map((elem, i) => <GridListTile onClick={() => props.showTrade(props.listType, i)} key={i}><TradeThumbnail {...elem} /></GridListTile>)
                    : <GridListTile>No Trades Found</GridListTile>}
            </GridList>
        </div>
    );
}

export default TradeList;