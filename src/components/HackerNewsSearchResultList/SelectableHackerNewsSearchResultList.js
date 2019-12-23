import React from 'react'

import { HackerNewsSearchResultList } from './HackerNewsSearchResultList'

export default function SelectableHackerNewsSearchResultList({ hits, handleToggle, selectedSearchResults }) {

  function isSelected(item) {
    return !!selectedSearchResults.find(selectedSearchResult => selectedSearchResult.objectID === item.objectID) || false
  }

  return (
    <HackerNewsSearchResultList {...{ hits, onListItemSelect: handleToggle, isSelected }} />
  )
}
