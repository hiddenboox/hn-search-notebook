import React from 'react'
import Typography from '@material-ui/core/Typography'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'

import { SearchNotebookModel, SearchResultModel } from '../../state/storage'

export default function Notebooks() {
  const history = useHistory()
  const [notebooks, setNotebooks] = React.useState(SearchNotebookModel.get())

  function deleteNotebook(notebookId) {
    const notebook = SearchNotebookModel.find(notebookId)
    notebook.searchResults.forEach(key => SearchResultModel.delete(notebookId, key))
    SearchNotebookModel.delete(notebookId)

    setNotebooks(notebooks => notebooks.filter(({ key }) => key !== notebookId))
  }

  function navigate(key) {
    return function (e) {
      history.push(`/notebooks/${key}`)
    }
  }

  return (
    <>
      <Typography variant="h3" component="h1">Notebooks</Typography>

      <List>
        {notebooks.map(({ key, title }) => (
          <ListItem key={key} dense button onClick={navigate(key)}>
            <ListItemText primary={title} />

            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => deleteNotebook(key)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Link href="/">
        Create new one
      </Link>
    </>
  )
}