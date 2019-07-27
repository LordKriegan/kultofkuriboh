import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import { TradeThumbnail } from '../';
const TradeList = (props) => {
    const classes = styles();
    return(
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {(props.list.length)
                    ? props.list.map((elem, i) => <GridListTile onClick={() => props.showTrade(props.listType, i)} key={i}><TradeThumbnail {...elem} /></GridListTile>)
                    : <GridListTile><Typography align="center">No Trades Found</Typography></GridListTile>}
            </GridList>
        </div>
    );
}

export default TradeList;