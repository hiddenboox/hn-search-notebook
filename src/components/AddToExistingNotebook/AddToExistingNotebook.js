import React from 'react'
import { useHistory } from 'react-router-dom'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import CreateIcon from '@material-ui/icons/Create'
import { normalize } from 'normalizr'

import { AddToExistingNotebookDialog } from './AddToExistingNotebookDialog'
import { SearchNotebookModel, SearchResultModel } from '../../state/storage'
import { noop } from '../../utils'
import { SearchResultSchema } from '../../state/schema'

export default function AddNotebook({ searchResults, query, onClick, ...props }) {
  const [open, setOpen] = React.useState(false)
  const history = useHistory()

  function toggleDialog() {
    onClick()
    setOpen(open => !open)
  }

  function addToExisting(notebookId) {
    if (searchResults.length > 0) {
      const notebook = SearchNotebookModel.find(notebookId)
      // TODO: move this to storage
      const { entities: { SearchResult } } = normalize(searchResults, [SearchResultSchema])
      const updatedSearchResults = [...notebook.searchResults, ...Object.keys(SearchResult)]
      
      SearchResultModel.set(SearchResult)
      SearchNotebookModel.update(notebookId, { searchResults: updatedSearchResults })
    }
    toggleDialog()
  }

  function onSuccess(notebookId) {
    addToExisting(notebookId)    
    history.push('/notebooks')
  }

  return (
    <>
      <SpeedDialAction
        icon={<CreateIcon />}
        tooltipTitle="Add to existing notebook"
        onClick={toggleDialog}
        {...props}
      />
      <AddToExistingNotebookDialog open={open} onCancel={toggleDialog} onSuccess={onSuccess} />
    </>
  )
}

AddNotebook.defaultProps = {
  searchResults: [],
  onClick: noop,
}
