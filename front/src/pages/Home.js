import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Home extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom={true}
          >
            About Post Helper
          </Typography>
          <List
            subheader={
              <ListSubheader component="div">
                This helper has two functions and maybe will be scaled in future:
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemText primary="Find domain position in Google results by queries" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Find repeated sentences with equal first letter" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  }
}

export default Home;