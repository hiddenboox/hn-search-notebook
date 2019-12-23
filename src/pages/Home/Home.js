import React from 'react'
import Typography from '@material-ui/core/Typography'

import { HackerNewsSearch } from '../../components/HackerNewsSearch'
import { SelectableHackerNewsSearchResultList } from '../../components/HackerNewsSearchResultList'
import { Pagination } from '../../components/Pagination'
import { AddNotebook } from '../../components/AddNotebook'
import { SearchQueryModel } from '../../state/storage'

const initialOptions = {
  hitsPerPage: 20,
  page: 0,
}

const initialState = {
  hits: []
}

export default function Home() {
  const [options, setOptions] = React.useState(initialOptions)
  const [searchResults, setSearchResults] = React.useState(initialState)
  const [selectedSearchResults, setSelectedSearchResults] = React.useState([])

  function updateOptions(value) {
    setOptions(options => ({ ...options, ...value }))
  }

  const onSearchSuccess = React.useCallback(function onSearchSuccess(json) {
    const id = SearchQueryModel.set(json)
    const hits = json.hits.map(hit => ({ ...hit, query: { ...json, id }}))
    setSearchResults({ ...json, hits })
  }, [setSearchResults])

  function onChangePage(page) {
    updateOptions({ page })
  }

  function onChangeRowsPerPage(rowsPerPage) {
    updateOptions({ hitsPerPage: rowsPerPage })
  }

  function handleToggle(value) {
    return function () {
      const currentIndex = selectedSearchResults.indexOf(value);
      const newChecked = [...selectedSearchResults];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setSelectedSearchResults(newChecked);
    }
  };

  return (
    <>
      <Typography variant="h3" component="h1">Search</Typography>
      <HackerNewsSearch onSuccess={onSearchSuccess} options={options} />
      <SelectableHackerNewsSearchResultList {...{...searchResults, handleToggle, selectedSearchResults }} />
      {searchResults.hits.length > 0 ? (
        <Pagination
          {...{
            hitsPerPage: searchResults.hitsPerPage,
            nbPages: searchResults.nbPages,
            onChangeRowsPerPage,
            onChangePage,
          }}
        />
      ) : null}
      <AddNotebook searchResults={selectedSearchResults} />
    </>
  )
}