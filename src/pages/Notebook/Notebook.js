import React from 'react'
import Typography from '@material-ui/core/Typography'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { useParams } from "react-router-dom"

import { SearchNotebookModel, SearchResultModel, SearchQueryModel } from '../../state/storage'

export default function Notebook() {
  const { id: notebookId } = useParams()
  const notebook = SearchNotebookModel.find(notebookId)
  const searchResults = notebook.searchResults
    .map(key => ({ key, ...SearchResultModel.find(key) }))
    .filter(Boolean)
    .map(searchResult => ({ ...searchResult, query: SearchQueryModel.find(searchResult.query) }))
  const [notebookSearchResults, setNotebookSearchResults] = React.useState(searchResults)

  function deleteResult(notebookId, id) {
    SearchResultModel.delete(notebookId, id)

    setNotebookSearchResults(results => results.filter(({ key }) => key !== id))
  }

  return (
    <>
      <Typography variant="h3" component="h1">Notebook <em>{notebook.title}</em></Typography>

      <List>
        {notebookSearchResults.map(({ key, author, title, url, points, createdAt, query }) => {
          const secondary = [
            `Author: ${author}`,
            `Karma: ${points}`,
            `Created: ${new Intl.DateTimeFormat('en-US').format(new Date(createdAt))}`,
            `Find by query: ${query.query}`
          ].join(' ')
          return (
            <ListItem key={key} dense>
              <ListItemText
                primary={url}
                secondary={secondary}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => deleteResult(notebookId, key)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}