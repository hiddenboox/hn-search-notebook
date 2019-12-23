import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useFormik } from 'formik'

import { noop } from '../../utils'

import styles from './SearchBar.module.css'

export default function SearchBar({ initialValues, onSubmit }) {
  const formik = useFormik({ initialValues, onSubmit });

  return (
    <Paper
      component="form"
      className={styles.root}
      onSubmit={formik.handleSubmit}
    >
      <div className={styles.rootInner}>
        <InputBase
          className={styles.input}
          placeholder="Search Hacker News"
          name="search"
          onChange={formik.handleChange}
          value={formik.values.search}
        />
        <div className={styles.submitWrapper}>
          <IconButton type="submit" className={styles.iconButton}>
            <SearchIcon />
          </IconButton>
          {formik.isSubmitting && <CircularProgress size={48} className={styles.submitProgress} />}
        </div>
      </div>
    </Paper>
  )
}

SearchBar.defaultProps = {
  initialValues: {
    search: ''
  },
  onSubmit: noop
}