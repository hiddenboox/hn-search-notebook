import React from 'react'
import TablePagination from '@material-ui/core/TablePagination'

import { noop } from '../../utils'

export default function Pagination({ nbPages, hitsPerPage, onChangePage, onChangeRowsPerPage }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(hitsPerPage)

  const totalCount = hitsPerPage * nbPages

  function handleChangePage(event, newPage) {
    setPage(newPage)
    onChangePage(newPage)
  }

  function handleChangeRowsPerPage(event) {
    const value = parseInt(event.target.value, 10)
    setRowsPerPage(value)
    setPage(0)
    onChangeRowsPerPage(value)
  }

  return (
    <TablePagination
      rowsPerPageOptions={[10, 20, 50, 100]}
      component="div"
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )
}

Pagination.defaultProps = {
  onChangeRowsPerPage: noop,
  onChangePage: noop,
}