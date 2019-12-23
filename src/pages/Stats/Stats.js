import React from 'react'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import groupBy from 'lodash.groupby'
import isBetween from 'dayjs/plugin/isBetween'
import dayjs from 'dayjs'

import { SearchQueryModel } from '../../state/storage'

dayjs.extend(isBetween)

export default function Stats() {
  const queries = groupBy(SearchQueryModel.get(), 'query')

  const list = Object
    .entries(queries)
    .reduce((acc, [queryText, query]) => {
        const averageHitsOfLastDay = query
        .filter(({ createdAt }) => dayjs(createdAt).isSame(dayjs(), 'day'))
        .reduce((acc, next) => acc += next.nbHits, 0)
        const averageHitsOfLastWeek = query
          .filter(({ createdAt }) => dayjs(createdAt).isBetween(dayjs().subtract(7, 'day'), dayjs(), 'day', '['))
          .reduce((acc, next) => acc += next.nbHits, 0)
      return acc.concat({ query: queryText, averageHitsOfLastDay, averageHitsOfLastWeek })
    }, [])

  return (
    <>
      <Typography variant="h3" component="h1">Notebooks</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>search query string</TableCell>
              <TableCell>average of total search result hits for the last day</TableCell>
              <TableCell>average of total search result hits for the last week</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {list.map(({ query, averageHitsOfLastDay, averageHitsOfLastWeek }) => (
            <TableRow key={query}>
              <TableCell>
                {query}
              </TableCell>
              <TableCell align="left">{averageHitsOfLastDay}</TableCell>
              <TableCell align="left">{averageHitsOfLastWeek}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}