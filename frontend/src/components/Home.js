import React from 'react';
import {Card} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    card: {
        maxWidth: 700,
        display: 'flex',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #0277bd 45%, #b2dfdb 55%)'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    block: {
        display: 'flex',
        justifyContent: "center",
        maxWidth: '100%',
        alignItem: 'center'

    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    content: {
        justifyContent: 'center'
    }
};


const Home = props => {
    const {classes} = props;

    return (
        //Centers the card in the middle of the screen need to fix sizing and centering
        <div className={classes.block}>
            <div className={classes.center}>
                <Card className={classes.card} raised={true}>
                    <CardContent className={classes.content}>
                        <Typography variant='h5' component='h2'>Welcome Home</Typography>
                        <Typography className={classes.pos} color='textSecondary'>Let's Get You Plugged In</Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default withStyles(styles)(Home);