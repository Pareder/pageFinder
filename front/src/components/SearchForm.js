import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchQueries from './SearchQueries';
import styles from './styles';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQueries: [],
      searchQuery: '',
      searchWord: '',
      errorQuery: false,
      errorWord: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleAdd() {
    if (this.state.searchQuery) {
      this.setState(state => ({
        searchQueries: [...new Set([...state.searchQueries, state.searchQuery])],
        searchQuery: '',
      }));
    }
  }

  handleDeleteClick = (id) => (event) => {
    event.preventDefault();

    const arr = [...this.state.searchQueries];
    arr.splice(id, 1);
    this.setState({
      searchQueries: arr
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    let isError = false;

    if (this.state.searchQueries.length === 0) {
      isError = true;

      this.setState({
        errorQuery: true,
      });
    }

    if (!this.state.searchWord) {
      isError = true;

      this.setState({
        errorWord: true,
      });
    }

    if (isError) {
      return;
    }

    this.setState({
      errorQuery: false,
      errorWord: false,
    });

    this.props.handleSubmitParent(this.state.searchQueries, this.state.searchWord);
  }

  render() {
    const { classes, loading } = this.props;
    const { searchQueries, errorQuery, errorWord } = this.state;

    return (
      <Card className={classes.margin}>
        <CardContent>
          <form className={classes.root} onSubmit={this.handleSubmit}>
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="searchQuery">Search Query</InputLabel>
              <Input
                id="searchQuery"
                error={errorQuery}
                value={this.state.searchQuery}
                onChange={this.handleChange('searchQuery')}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.marginBottom}
                      onClick={this.handleAdd}
                    >
                      Add
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
            {searchQueries.length > 0 &&
              <SearchQueries
                searchQueries={searchQueries}
                handleDeleteClick={this.handleDeleteClick}
              />
            }
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="searchWord">Search Word</InputLabel>
              <Input
                id="searchWord"
                error={errorWord}
                value={this.state.searchWord}
                onChange={this.handleChange('searchWord')}
              />
            </FormControl>
            <div className={classes.wrapper}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.margin}
                onClick={this.handleSubmit}
              >
                Search
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(SearchForm);
