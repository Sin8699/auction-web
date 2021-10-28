import Dashboard from 'pages/dashboard'
import Tables from 'layouts/tables'
import Billing from 'layouts/billing'
import Profile from 'pages/profile'
import SignIn from 'pages/sign-in'
import SignUp from 'pages/sign-up'
import ProductDetail from 'pages/product-detail'
import FavoriteProducts from './pages/favorite-products/index'

import { TYPE_ROUTER, ROUTER_DEFAULT } from 'constants/router'
import HistoryProducts from './pages/history-products/index'

const routes = [
  {
    key: 'dashboard',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.DASHBOARD,
    component: Dashboard
  },
  {
    key: 'favorite-product',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.FAVORITE,
    component: FavoriteProducts
  },
  {
    type: TYPE_ROUTER.PRIVATE,
    key: 'history-product',
    route: ROUTER_DEFAULT.HISTORY,
    component: HistoryProducts
  },
  {
    key: 'product-detail',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.PRODUCT_DETAIL + '/:id',
    component: ProductDetail
  },
  {
    key: 'tables',
    type: TYPE_ROUTER.PRIVATE,
    route: '/tables',
    component: Tables
  },
  {
    key: 'billing',
    type: TYPE_ROUTER.PRIVATE,
    route: '/billing',
    component: Billing
  },
  {
    key: 'profile',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.PROFILE,
    component: Profile
  },
  {
    key: 'sign-in',
    type: TYPE_ROUTER.AUTHENTICATION,
    route: ROUTER_DEFAULT.SIGN_IN,
    component: SignIn
  },
  {
    key: 'sign-up',
    type: TYPE_ROUTER.AUTHENTICATION,
    route: ROUTER_DEFAULT.SIGN_UP,
    component: SignUp
  }
]

export default routes
