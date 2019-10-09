import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
const styles = theme => ({
  card: {
    margin: theme.spacing(2)
  },
  media: {
    height: 150,
    backgroundSize: 'contain'
  },
  actions: {
    justifyContent: 'center'
  }
});

function Home({classes}) {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom={true}
        >
          About Page Finder
        </Typography>
        <List
          subheader={
            <ListSubheader component="div">
              This application has two functions and maybe will be scaled in future:
            </ListSubheader>
          }
        >
        </List>
        <Grid container>
          <Grid xs={12} sm={6}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://vignette.wikia.nocookie.net/google/images/a/a7/Unnamed_%282%29-0.png/revision/latest?cb=20180312195233"
                title="Position in Google"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  Find domain position in Google results by queries
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="center">
                  You can find out on what page of Google results your site is located
                </Typography>
              </CardContent>
              <CardActions className={classes.actions}>
                <Button
                  size="large"
                  component={AdapterLink}
                  to="/pageFinder"
                  color="primary"
                  variant="contained"
                >
                  Try it
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={12} sm={6}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="https://icon-library.net/images/text-icon/text-icon-12.jpg"
                title="Repeated sentences"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  Find repeated sentences with equal first word
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="center">
                  You can find sentences which starts with the same word
                </Typography>
              </CardContent>
              <CardActions className={classes.actions}>
                <Button
                  size="large"
                  component={AdapterLink}
                  to="/textFinder"
                  color="primary"
                  variant="contained"
                >
                  Try it
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Home);
