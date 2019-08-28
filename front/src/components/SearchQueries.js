import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

function SearchQueries({searchQueries, handleDeleteClick}) {
  return (
    <List>
      {searchQueries.map((query, id) =>
        <ListItem key={id}>
          <ListItemText
            secondary={
              <>
                <IconButton
                  color="secondary"
                  onClick={handleDeleteClick(id)}
                >
                  <ClearIcon/>
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

export default SearchQueries;
