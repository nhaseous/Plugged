import React, {Component} from "react";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    pic: {
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    rows: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    font: {
        fontSize: '1em'
    },
    name: {
        fontSize: '1.5em'
    }
};

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.rows}>
                <div className={classes.pic}>
                        IMAGE
                </div>
                <div className={ classes.container }>
                    <Typography variant='h4' className={classes.font}> Followers: 15 </Typography>
                    <Typography variant='h2' className={classes.name}>John J. Jingleheimerschmidt</Typography>
                    <Typography variant='h4' className={classes.font}> Following: 10 </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Profile);