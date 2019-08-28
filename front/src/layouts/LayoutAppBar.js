import React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import styles from '../components/styles';

function LayoutAppBar({classes, open, handleDrawerOpen}) {
  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar disableGutters={!open}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerOpen}
          className={classNames(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          Page Finder
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(LayoutAppBar);
