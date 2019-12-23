import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useFormik } from 'formik'

import { noop, uuid } from '../../utils'

export function AddNotebookDialog({ open, onSuccess, onCancel }) {
  const formik = useFormik({
    initialValues: {
      title: '',
      creationDate: Date.now(),
      searchResults: [],
      id: uuid(),
    },
    onSubmit: onSuccess,
  });

  return (
    <div>
      <Dialog open={open} onClose={onCancel}>
        <form onSubmit={formik.handleSubmit} id="add-notebook">
          <DialogTitle>Create notebook</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              name="title"
              margin="dense"
              label="Title"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add Notebook
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

AddNotebookDialog.defaultProps = {
  onCancel: noop,
  onSuccess: noop,
}