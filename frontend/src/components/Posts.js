import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        maxWidth: 2500,
        backgroundColor: 'gray'
    },
    cell: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
});

let id = 0;
let createData = el => {
    id += 1;
    return { id, ...el };
};

class SimpleTable extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }


    render() {
        const data = this.props.rows.map(el => createData(el));
        const sent = time => {
            let diff = Date.now() - new Date(time);
        };

        console.log(data);

        return (
            <Paper className={this.props.root}>
                <Table className={this.props.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Posts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.id}>
                                <TableCell className={this.props.cell} component="th" scope="row">
                                    <div display="inline-flex" flex-direction="row">
                                        <Avatar alt="User pic" src={row.imgSrc}/>
                                        <Typography variant="caption" align-self="right">Time</Typography>
                                    </div>
                                    <Typography variant="body1" align-self="center"> {row.msg} </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);