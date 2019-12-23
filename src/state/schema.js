import { schema } from 'normalizr';

export const SearchQuerySchema = new schema.Entity('SearchQuery', {}, {
  processStrategy: ({ query, nbHits }) => {
    return {
      query,
      createdAt: new Date(),
      nbHits,
    }
  }
})

export const SearchResultSchema = new schema.Entity('SearchResult', {
  query: SearchQuerySchema,
}, {
  idAttribute: 'objectID',
  processStrategy: ({ author, points, url, created_at, _tags, query }) => {
    return {
      author,
      points,
      url,
      createdAt: created_at,
      tags: _tags,
      query,
    }
  }
})

export const SearchNotebookSchema = new schema.Entity('SearchNotebook', {
  searchResults: [SearchResultSchema]
})
