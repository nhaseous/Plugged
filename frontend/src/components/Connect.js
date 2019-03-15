import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    marginTop: 25,
    position: 'relative',
    height: 200,
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.10,
      },
      '& $imageMarked': {
        opacity: 0,
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 50%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
});

const images = [
  {
    url: 'https://o.aolcdn.com/images/dims3/GLOB/crop/5750x2881+0+298/resize/630x315!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Fe4a1355ad160a67d6e5420ee13f33363%2F205896130%2Frock-concert-picture-id627682404',
    title: 'Concert',
    width: '33%',
  },
  {
    url: 'https://under30ceo.com/wp-content/uploads/2015/02/Talk-With-People.jpg',
    title: 'Chat',
    width: '33%',
  },
  {
    url: 'https://cz.cityspy.network/prague/wp-content/uploads/sites/10/2017/03/eec7538f2151e5f32aa8b08fbdbbbfdb.jpg',
    title: 'Jam',
    width: '33%',
  },
];

class Connect extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          {images.map(image => (
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: image.width,
              }}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                </Typography>
              </span>
            </ButtonBase>
          ))}
        </div>
      );
    }
}

export default withStyles(styles)(Connect);
=======
import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    marginTop: 25,
    position: 'relative',
    height: 200,
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.10,
      },
      '& $imageMarked': {
        opacity: 0,
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 50%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
});

const images = [
  {
    url: 'https://o.aolcdn.com/images/dims3/GLOB/crop/5750x2881+0+298/resize/630x315!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Fe4a1355ad160a67d6e5420ee13f33363%2F205896130%2Frock-concert-picture-id627682404',
    title: 'Concert',
    width: '33%',
  },
  {
    url: 'https://under30ceo.com/wp-content/uploads/2015/02/Talk-With-People.jpg',
    title: 'Chat',
    width: '33%',
  },
  {
    url: 'https://cz.cityspy.network/prague/wp-content/uploads/sites/10/2017/03/eec7538f2151e5f32aa8b08fbdbbbfdb.jpg',
    title: 'Jam',
    width: '33%',
  },
];

class Connect extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          {images.map(image => (
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: image.width,
              }}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                </Typography>
              </span>
            </ButtonBase>
          ))}
        </div>
      );
    }
}

export default withStyles(styles)(Connect);
>>>>>>> 5ba552f1dd55d6b6bdd7d4a77d4eb1c1af77d578
