export const actionTypesSearch = {
  SEARCHING: 'SEARCHING',
  SET_SEARCH: 'SET_SEARCH'
}

export const searchingData = ({query}) => ({
  type: actionTypesSearch.SEARCHING,
  query: query
})

export const setSearch = ({data}) => ({
  type: actionTypesSearch.SET_SEARCH,
  data
})
