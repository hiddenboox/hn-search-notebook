import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { SearchNotebookModel } from '../../state/storage'
import { noop } from '../../utils'

export function AddToExistingNotebookDialog({ searchResults, open, onSuccess, onCancel }) {
  return (
    <div>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>Select existing notebook</DialogTitle>
        <DialogContent>
          <List>
            {SearchNotebookModel.get().map(notebook => (
              <ListItem
                key={notebook.id}
                dense
                button
                onClick={() => onSuccess(notebook.id)}
              >
                <ListItemText primary={notebook.title} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  )
}

AddToExistingNotebookDialog.defaultProps = {
  onCancel: noop,
  onSuccess: noop,
}