import React from 'react';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import API from '../api';

class PageFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      loading: false,
      error: false
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
        pages: [...prevState.pages, ...pages]
      }));
    } catch (err) {
      this.setState({
        error: true
      });
    }

    this.setState({
      loading: false
    });
  }

  handleClose = () => {
    this.setState({
      error: false
    });
  }

  render() {
    const {pages, loading, error} = this.state;

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
        <SearchResults pages={pages}/>
        }
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={error}
          autoHideDuration={60000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">The server error has occurred</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon/>
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default PageFinder;
