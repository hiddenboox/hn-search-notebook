import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'

import { AddNotebookDialog } from './AddNotebookDialog'
import { SearchNotebookModel } from '../../state/storage'
import { noop } from '../../utils'

export default function AddNotebook({ searchResults, query, onClick, ...props }) {
  const [open, setOpen] = React.useState(false)
  const history = useHistory()

  function toggleDialog() {
    onClick()
    setOpen(open => !open)
  }

  function onSuccess(values) {
    toggleDialog()
    SearchNotebookModel.set({ ...values, searchResults })
    history.push('/notebooks')
  }

  return (
    <>
      <SpeedDialAction
        icon={<AddIcon />}
        tooltipTitle="Create new notebook"
        onClick={toggleDialog}
        {...props}
      />
      <AddNotebookDialog open={open} onCancel={toggleDialog} onSuccess={onSuccess} />
    </>
  )
}

AddNotebook.defaultProps = {
  searchResults: [],
  onClick: noop,
}
