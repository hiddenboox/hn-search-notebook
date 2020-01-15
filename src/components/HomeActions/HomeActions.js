import React from 'react'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'

import { AddNotebook } from '../AddNotebook'
import { AddToExistingNotebook } from '../AddToExistingNotebook'

import styles from './HomeActions.module.css'

export default function HomeActions({ searchResults }) {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

    return (
        <SpeedDial
            className={styles.root}
            icon={<SpeedDialIcon />}
            ariaLabel="actions"
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            hidden={searchResults.length === 0}
            direction="up"
        >
            <AddNotebook
                searchResults={searchResults}
                onClick={handleClose}
            />
            <AddToExistingNotebook 
                searchResults={searchResults}
                onClick={handleClose}
            />
      </SpeedDial>
    )
}

HomeActions.defaultProps = {
    searchResults: []
}