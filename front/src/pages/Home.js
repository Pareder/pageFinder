import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

function Home() {
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
          <Link component={AdapterLink} to="/pageFinder" color="primary">
            <ListItem>
              Find domain position in Google results by queries
            </ListItem>
          </Link>
          <Link component={AdapterLink} to="/textFinder" color="primary">
            <ListItem>
              Find repeated sentences with equal first letter
            </ListItem>
          </Link>
        </List>
      </CardContent>
    </Card>
  );
}

export default Home;
