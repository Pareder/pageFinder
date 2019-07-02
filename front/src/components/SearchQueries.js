import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

class SearchQueries extends React.Component {
  render() {
    const searchQueries = this.props.searchQueries;

    return (
      <List>
        {searchQueries.map((query, id) =>
          <ListItem key={query}>
            <ListItemText
              secondary={
                <>
                  <IconButton
                    color="secondary"
                    onClick={this.props.handleDeleteClick(id)}
                  >
                    <ClearIcon />
                  </IconButton>
                  {query}
                </>
              }
            />
          </ListItem>
        )}
      </List>
    );
  }
}

export default SearchQueries;