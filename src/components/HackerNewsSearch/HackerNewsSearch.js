import React from 'react'
import { stringify } from 'querystring'

import { noop } from '../../utils'
import { SearchBar } from '../SearchBar'
import { useDidMountEffect } from '../../hooks/useDidMountEffect'

const initialState = {
  search: ''
}

export default function HackerNewsSearch({ onSuccess, onFailure, options }) {
  const [currentQuery, setCurrentQuery] = React.useState(initialState)

  const search = React.useCallback(async function search(values) {
    const query = {
      hitsPerPage: options.hitsPerPage,
      page: options.page,
      query: values.search,
    }

    try {
      setCurrentQuery(values)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/search/?${stringify(query)}`)
      const json = await response.json()
      onSuccess(json)
    } catch (ex) {
      onFailure(ex)
    }
  }, [onFailure, onSuccess, options.hitsPerPage, options.page])

  useDidMountEffect(() => {
    search(currentQuery)
  }, [options.hitsPerPage, options.page])

  return (
    <SearchBar onSubmit={search} />
  )
}

HackerNewsSearch.defaultProps = {
  onSucces: noop,
  onFailure: noop,
}
