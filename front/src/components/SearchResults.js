import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveIcon from '@material-ui/icons/Remove';
import styles from './styles';

function SearchResults({classes, pages}) {
  return (
    <Card className={classes.margin}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Search Results
        </Typography>
        <List>
          {pages.map((page, id) => (
            <ListItem key={id}>
              <ListItemIcon>
                <RemoveIcon/>
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    {page.query}:
                    <Typography
                      component="span"
                      inline="true"
                      color={page.resultStatus ? 'primary' : 'error'}
                      className={classes.marginLeft}
                    >
                      {page.result}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(SearchResults);
