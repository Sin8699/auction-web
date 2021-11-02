export const actionTypesSubCategory = {
  REQUEST_SUB_CATEGORY_DATA: 'REQUEST_SUB_CATEGORY_DATA',
  SET_SUB_CATEGORY_DATA: 'SET_SUB_CATEGORY_DATA'
}

export const requestSubCategoryData = () => ({
  type: actionTypesSubCategory.REQUEST_SUB_CATEGORY_DATA
})

export const setSubCategoryData = data => ({
  type: actionTypesSubCategory.SET_SUB_CATEGORY_DATA,
  data
})
