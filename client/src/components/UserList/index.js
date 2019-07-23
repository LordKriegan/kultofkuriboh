import React from 'react';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { User } from '../../api/';
import styles from './styles';
const UserList = (props) => {
    const classes = styles();
    const myId = User.getUser().id;
    return (
        <Card>
            <CardHeader title="Users" align="center" />
            <CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(props.list.length)
                            ? <>
                                {props.list.filter(elem=>elem._id !== myId).map((elem, i) => {
                                    return (<TableRow key={i}>
                                        <TableCell><Avatar size="small" component="span" style={{ height: "25px", width: "25px" }} src={elem.picture} /></TableCell>
                                        <TableCell><Link to={"/profile?id=" + elem._id}>{elem.name}</Link></TableCell>
                                        <TableCell>{elem.rating}</TableCell>
                                        <TableCell className={classes.userActions}>
                                            <Button>Trade</Button>
                                            <Button>Chat</Button>
                                        </TableCell>
                                    </TableRow>);
                                })}
                            </>
                            : <></>}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default UserList;