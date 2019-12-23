import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import NotesIcon from '@material-ui/icons/Notes'
import InfoIcon from '@material-ui/icons/Info'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction component={NavLink} to="/" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction component={NavLink} to="/notebooks" label="Notebooks" icon={<NotesIcon />} />
      <BottomNavigationAction component={NavLink} to="/stats" label="Stats" icon={<InfoIcon />} />
    </BottomNavigation>
  )
}