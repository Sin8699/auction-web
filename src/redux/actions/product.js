export const actionTypesProduct = {
  REQUEST_PRODUCTS_DATA: 'REQUEST_PRODUCTS_DATA',
  SET_PRODUCTS_DATA: 'SET_PRODUCTS_DATA',
  REQUEST_PRODUCT: 'REQUEST_PRODUCT',
  SET_PRODUCT: 'SET_PRODUCT'
}

export const requestProductsData = () => ({
  type: actionTypesProduct.REQUEST_PRODUCTS_DATA
})

export const setProductsData = data => ({
  type: actionTypesProduct.SET_PRODUCTS_DATA,
  data
})

export const requestProduct = id => ({
  type: actionTypesProduct.REQUEST_PRODUCT,
  idProduct: id
})

export const setProduct = data => ({
  type: actionTypesProduct.SET_PRODUCT,
  data
})
