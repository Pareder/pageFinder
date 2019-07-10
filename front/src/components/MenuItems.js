import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import styles from './styles';
import config from '../config';

class MenuItems extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <List>
        {config.menuItems.map(item => {
          const IconName = item.icon;

          return (
            <ListItem
              button
              className={classes.listItem}
              component={Link}
              to={item.link}
              key={item.text}
            >
              <ListItemIcon>
                <IconName/>
              </ListItemIcon>
              <ListItemText primary={item.text}/>
            </ListItem>
          )
        })}
      </List>
    );
  }
}

export default withStyles(styles)(MenuItems);
