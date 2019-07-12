import React from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Home from '../pages/Home';
import PageFinder from '../pages/PageFinder';
import TextFinder from '../pages/TextFinder';
import styles from '../components/styles';

class LayoutMain extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route exact path="/" render ={ ()=> <Home/> } />
        <Route path="/pageFinder" render ={ ()=> <PageFinder/> } />
        <Route path="/textFinder" render ={ ()=> <TextFinder/> } />
      </main>
    );
  }
}

export default withStyles(styles)(LayoutMain);
