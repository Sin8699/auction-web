/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {useDispatch} from 'react-redux'

import {requestCategoryData} from 'redux/actions/category'
import {requestProductsData} from 'redux/actions/product'
import {requestSubCategoryData} from 'redux/actions/subcategory'
import {requestProfile} from 'redux/actions/user'

const LayoutContainerDispatcher = ({children}) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(requestCategoryData())
    dispatch(requestProductsData())
    dispatch(requestSubCategoryData())
    dispatch(requestProfile())
  }, [])
  return <>{children}</>
}

export default LayoutContainerDispatcher
