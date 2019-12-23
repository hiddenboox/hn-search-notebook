import { normalize } from 'normalizr'

import { SearchNotebookSchema, SearchQuerySchema } from './schema'
import { uuid } from '../utils'

const Entities = {
  SearchNotebook: 'SearchNotebook',
  SearchResult: 'SearchResult',
  SearchQuery: 'SearchQuery',
}

const getLocalStorage = (entity) => JSON.parse(global.localStorage.getItem(entity)) || {}

export const SearchNotebookModel = {
  set: (notebook) => {
    const notebooks = getLocalStorage(Entities.SearchNotebook)

    const { entities: { SearchResult, SearchNotebook } } = normalize(notebook, SearchNotebookSchema)
    
    global.localStorage.setItem(
      Entities.SearchNotebook,
      JSON.stringify({ ...notebooks, ...SearchNotebook })
    )

    SearchResultModel.set(SearchResult)
  },
  get: () => Object.entries(getLocalStorage(Entities.SearchNotebook)).flatMap(([key, value]) => ({ key, ...value }) ),
  find: id => getLocalStorage(Entities.SearchNotebook)[id],
  update: (id, value) => {
    const notebook = SearchNotebookModel.find(id)
    const notebooks = getLocalStorage(Entities.SearchNotebook)

    if (notebook) {
      const updated = {...notebook, ...value }

      SearchNotebookModel.delete(id)

      global.localStorage.setItem(
        Entities.SearchNotebook,
        JSON.stringify({ ...notebooks, [id]: updated })
      )
    }
  },
  delete: id => {
    const notebook = SearchNotebookModel.find(id)

    if (notebook) {
      const notebooks = getLocalStorage(Entities.SearchNotebook)

      delete notebooks[id]

      global.localStorage.setItem(
        Entities.SearchNotebook,
        JSON.stringify(notebooks)
      )
    }
  }
}

export const SearchResultModel = {
  set: (searchResults) => {
    const notebookResults = getLocalStorage(Entities.SearchResult)

    global.localStorage.setItem(
      Entities.SearchResult,
      JSON.stringify({ ...notebookResults, ...searchResults })
    )
  },
  find: id => getLocalStorage(Entities.SearchResult)[id],
  delete: (notebookId, id) => {
    const result = SearchResultModel.find(id)

    if (result) {
      const searchResults = getLocalStorage(Entities.SearchResult)
      delete searchResults[id]

      global.localStorage.setItem(
        Entities.SearchResult,
        JSON.stringify(searchResults)
      )

      const notebook = SearchNotebookModel.find(notebookId)

      const updatedSearchResults = notebook.searchResults.filter(resultId => resultId !== id)

      SearchNotebookModel.update(notebookId, { searchResults: updatedSearchResults })
    }
  }
}

export const SearchQueryModel = {
  set: (response) => {
    const queries = getLocalStorage(Entities.SearchQuery)

    const { entities: { SearchQuery } } = normalize({ ...response, id: uuid() }, SearchQuerySchema)

    global.localStorage.setItem(
      Entities.SearchQuery,
      JSON.stringify({ ...queries, ...SearchQuery })
    )

    return Object.keys(SearchQuery)[0]
  },
  find: id => getLocalStorage(Entities.SearchQuery)[id],
  get: () => Object.entries(getLocalStorage(Entities.SearchQuery)).flatMap(([key, value]) => ({ key, ...value }) ), 
}