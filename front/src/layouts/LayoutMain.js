import React from 'react';
import {Route} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Home from '../pages/Home';
import PageFinder from '../pages/PageFinder';
import TextFinder from '../pages/TextFinder';
import styles from '../components/styles';

function LayoutMain({classes}) {
  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
      <Route exact path="/" render={() => <Home/>}/>
      <Route path="/pageFinder" render={() => <PageFinder/>}/>
      <Route path="/textFinder" render={() => <TextFinder/>}/>
    </main>
  );
}

export default withStyles(styles)(LayoutMain);
