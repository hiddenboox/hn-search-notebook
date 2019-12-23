import React from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'

import { noop } from '../../utils'

export function HackerNewsSearchResultList({ hits, onListItemSelect, isSelected }) {

  if (hits.length <= 0) {
    return null
  }

  return (
    <>
      <List>
        {hits.map(item => (
          <ListItem key={item.objectID} dense button onClick={onListItemSelect(item)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={isSelected(item)}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

HackerNewsSearchResultList.defaultProps = {
  hits: [],
  isSelected: noop,
}