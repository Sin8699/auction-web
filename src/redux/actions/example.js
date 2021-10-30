export const actionTypesExample = {
  REQUEST_EXAMPLE_DATA: 'REQUEST_EXAMPLE_DATA',
  SET_EXAMPLE_DATA: 'SET_EXAMPLE_DATA'
}

export const requestExampleData = () => ({
  type: actionTypesExample.REQUEST_EXAMPLE_DATA
})

export const setExampleData = data => ({
  type: actionTypesExample.SET_EXAMPLE_DATA,
  data
})
