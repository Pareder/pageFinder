import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import RemoveIcon from '@material-ui/icons/Remove';
import styles from '../components/styles';
import {findRepeatingSentences} from '../utils';

class TextFinder extends React.Component {
  state = {
    text: '',
    errorText: false,
    repeatedSentences: [],
    submitted: false,
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.text) {
      this.setState({
        errorText: true
      });

      return;
    }

    if (this.state.errorText) {
      this.setState({
        errorText: false
      });
    }

    this.setState({
      submitted: true,
      repeatedSentences: findRepeatingSentences(this.state.text),
    });
  }

  render() {
    const {classes} = this.props;
    const {text, errorText, repeatedSentences, submitted} = this.state;

    return (
      <div>
        <Typography variant="h5">
          Enter text to find repeatable word at the start of the sentences
        </Typography>
        <Card className={classes.margin}>
          <CardContent>
            <form className={classes.root} onSubmit={this.handleSubmit}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.margin}
              >
                <TextField
                  variant="outlined"
                  label="Enter text"
                  multiline={true}
                  rows={10}
                  error={errorText}
                  value={text}
                  onChange={this.handleChange}
                />
              </FormControl>
              <div className={classes.wrapper}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  onClick={this.handleSubmit}
                >
                  Find
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {repeatedSentences.length > 0 ?
          <Card className={classes.margin}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Sentences with equal first word
              </Typography>
              <List>
                {repeatedSentences.map((sentence, id) =>
                  <ListItem key={id}>
                    <ListItemIcon>
                      <RemoveIcon/>
                    </ListItemIcon>
                    <ListItemText
                      primary={sentence}
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
          : submitted &&
          <Card className={classes.margin}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Good job. No repeatance more than 2 times.
              </Typography>
            </CardContent>
          </Card>
        }
      </div>
    );
  }
}

export default withStyles(styles)(TextFinder);
