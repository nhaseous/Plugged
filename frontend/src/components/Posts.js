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
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Time from 'react-time';

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
        this.state = {
          me: {avatar: ''},
          posts: [{body: '', date: ''}]
        };
    }

    componentDidMount() {
      axios.get('api/posts/me').then(res => {
        this.setState({
          me: {avatar: res.data.user.avatar},
          posts: (res.data.posts).map(function(element) {
            return element;
          })});
        });
      };

    render() {
        const data = this.state.posts.map(el => createData({body: el.body, date: el.date}));

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
                                        <Avatar alt="User pic" src={this.state.me.avatar}/>
                                        <Typography variant="caption" align-self="right">
                                            <Time value={row.date} format="MM/DD/YYYY" />
                                        </Typography>
                                    </div>
                                    <Typography variant="body1" align-self="center"> {row.body} </Typography>
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
