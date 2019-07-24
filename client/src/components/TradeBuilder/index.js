import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove';

const TradeBuilder = (props) => {
    console.log(props)
    return (
        <Card>
            <CardHeader align="center" subheader={props.rating} title={props.name} avatar={<Avatar src={props.picture} />} />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Set</TableCell>
                                            <TableCell>Card</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(props.haves.length)
                                            ? props.haves.map((elem, i) => {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell>{elem.set}</TableCell>
                                                        <TableCell>{elem.name}</TableCell>
                                                        <TableCell>{elem.quantity}</TableCell>
                                                        <TableCell>
                                                            <IconButton onClick={() => props.moveToOffer(props.side, i)}>
                                                                <Add />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                            : <></>}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Set</TableCell>
                                            <TableCell>Card</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(props.offer.length)
                                            ? props.offer.map((elem, i) => {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell>{elem.set}</TableCell>
                                                        <TableCell>{elem.name}</TableCell>
                                                        <TableCell>{elem.quantity}</TableCell>
                                                        <TableCell>
                                                            <IconButton onClick={() => props.moveToHaves(props.side, i)}>
                                                                <Remove />
                                                            </IconButton>
                                                            
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                            : <></>}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default TradeBuilder;