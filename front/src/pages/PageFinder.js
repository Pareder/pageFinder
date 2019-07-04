import React from 'react';
import axios from 'axios';
import config from '../config'
import Typography from '@material-ui/core/Typography';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(searchQueries, searchWord) {
    this.setState({
      loading: true,
    });

    axios.post(`${config.apiServer}/getPages`, {
      queries: searchQueries,
      searchWord: searchWord,
    })
      .then(res => {
        const pages = res.data.data;

        this.setState(state => ({ 
          loading: false,
          pages: [...state.pages, ...pages],
        }));
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
      })
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
