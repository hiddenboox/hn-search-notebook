import React from 'react'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'

import { AddNotebookDialog } from './AddNotebookDialog'
import { SearchNotebookModel } from '../../state/storage'

import styles from './AddNotebook.module.css'

export default function AddNotebook({ searchResults, query }) {
  const [open, setOpen] = React.useState(false)
  const history = useHistory()

  function toggleDialog() {
    setOpen(open => !open)
  }

  function onSuccess(values) {
    toggleDialog()
    SearchNotebookModel.set({ ...values, searchResults })
    history.push('/notebooks')
  }

  return (
    <>
      <Zoom
        in={searchResults.length > 0}
        unmountOnExit
      >
        <Fab className={styles.root} onClick={toggleDialog}>
          <AddIcon />
        </Fab>
      </Zoom>
      <AddNotebookDialog open={open} onCancel={toggleDialog} onSuccess={onSuccess} />
    </>
  )
}

AddNotebook.defaultProps = {
  searchResults: []
}
