import React from 'react';
import Typography from '@material-ui/core/Typography';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import API from '../api';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      loading: false,
    };

    this._api = API.createFrom();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(searchQueries, searchWord) {
    this.setState({
      loading: true,
    });

    try {
      const pages = await this._api.getPages(searchQueries, searchWord);

      this.setState(prevState => ({
        loading: false,
        pages: [...prevState.pages, ...pages]
      }));
    } catch (err) {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const { pages, loading } = this.state;

    return (
      <div>
        <Typography variant="h5">
          Enter queries and check their Google's positions by the search word
        </Typography>
        <SearchForm
          loading={loading}
          handleSubmitParent={this.handleSubmit}
        />
        {pages.length > 0 &&
          <SearchResults pages={pages} />
        }
      </div>
    );
  }
}

export default Main;
