import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove';
import Clear from '@material-ui/icons/Clear';
import Box from '@material-ui/core/Box'

const CardList = (props) => {
    const [rowState, setRowState] = useState({
        rowId: ''
    });
    const rowClick = (id) => {
        props.setCardName(props.list[id].name);
        setRowState({
            ...rowState, rowId: id
        });
    }
    return (
        <Card>
            <CardHeader title={props.title} titleTypographyProps={{ align: "center" }} />
            <CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            {(props.editable) ? <TableCell></TableCell> : <></>}
                            <TableCell>Set</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(props.list.length)
                            ? props.list.map((elem, i) => {
                                return (
                                    <TableRow selected={rowState.rowId === i} onClick={() => rowClick(i)} key={i}>
                                        {(props.editable) ? <TableCell padding="none">
                                            <IconButton onClick={() => {props.removeFromList(i, props.listType) }} size="small" start="edge" color="primary" aria-label={"Remove from " + props.listType}>
                                                <Clear />
                                            </IconButton>
                                        </TableCell> : <></>}
                                        <TableCell padding="none">{elem.set}</TableCell>
                                        <TableCell padding="none">{elem.name}</TableCell>
                                        <TableCell padding="none">
                                            <Box display="flex" flexDirection="row">
                                                {(props.editable) ? <IconButton onClick={()=> { props.modifyList(i, (elem.quantity - 1 > 1) ? elem.quantity - 1 : 1, props.listType) }} size="small" start="edge" color="primary" aria-label="Decrement Quantity">
                                                    <Remove />
                                                </IconButton> : <></>}
                                                {elem.quantity}
                                                {(props.editable) ? <IconButton onClick={() => { props.modifyList(i, elem.quantity + 1, props.listType) }} size="small" start="edge" color="primary" aria-label="Increment Quantity">
                                                    <Add />
                                                </IconButton> : <></>}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                            : <></>}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default CardList;