import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import LayoutAppBar from './layouts/LayoutAppBar';
import LayoutDrawer from './layouts/LayoutDrawer';
import LayoutMain from './layouts/LayoutMain';
import styles from './components/styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleDrawerOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <div className={classes.dFlex}>
          <LayoutAppBar
            open={this.state.open}
            handleDrawerOpen={this.handleDrawerOpen}
          />
          <LayoutDrawer
            open={this.state.open}
            handleDrawerClose={this.handleDrawerClose}
          />
          <LayoutMain />
        </div>
      </Router>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
