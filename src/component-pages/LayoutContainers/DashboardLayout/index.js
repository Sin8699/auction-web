/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import SuiBox from 'components/SuiBox'
import styles from 'component-pages/LayoutContainers/DashboardLayout/styles'
import {useSoftUIController} from 'context'
import {requestCategoryData} from 'redux/actions/category'
import {requestProductsData} from 'redux/actions/product'
import {requestSubCategoryData} from 'redux/actions/subcategory'
import {requestProfile} from 'redux/actions/user'
import {
  requestBiddingProductsData,
  requestListBiddingProductHasSold
} from 'redux/actions/bidding-product'

function LayoutContainer({children}) {
  const dispatchRedux = useDispatch()

  const [controller, dispatch] = useSoftUIController()
  const {miniSidenav, direction} = controller
  const {pathname} = useLocation()
  const classes = styles({miniSidenav, direction})

  useEffect(() => {}, [])

  useEffect(() => {
    dispatch({type: 'LAYOUT', value: 'dashboard'})
  }, [dispatch, pathname])

  useEffect(() => {
    dispatchRedux(requestProfile())
    dispatchRedux(requestCategoryData())
    dispatchRedux(requestProductsData())
    dispatchRedux(requestSubCategoryData())
    dispatchRedux(requestBiddingProductsData())
    dispatchRedux(requestListBiddingProductHasSold())
  }, [])

  return <SuiBox customClass={classes.layoutContainer}>{children}</SuiBox>
}

LayoutContainer.propTypes = {children: PropTypes.node.isRequired}

export default LayoutContainer
