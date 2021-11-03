export const actionTypesCategory = {
  REQUEST_CATEGORY_DATA: 'REQUEST_CATEGORY_DATA',
  SET_CATEGORY_DATA: 'SET_CATEGORY_DATA'
}

export const requestCategoryData = () => ({
  type: actionTypesCategory.REQUEST_CATEGORY_DATA
})

export const setCategoryData = data => ({
  type: actionTypesCategory.SET_CATEGORY_DATA,
  data
})
