import SignIn from 'pages/sign-in'
import SignUp from 'pages/sign-up'
import ForgotPassword from './pages/forgot-password'
import ResetPassword from './pages/reset-password'

import Dashboard from 'pages/dashboard'
import Billing from 'layouts/billing'
import Profile from 'pages/profile'
import ProductDetail from 'pages/product-detail'
import HistoryProducts from './pages/history-products'
import FavoriteProducts from './pages/favorite-products'

import CategoryManager from 'pages/category-manager'
import NewCategory from 'pages/category-manager/new'
import EditCategory from 'pages/category-manager/edit'
import EditUser from 'pages/user-manager/edit'
import UserManager from 'pages/user-manager'

import { TYPE_ROUTER, ROUTER_DEFAULT } from 'constants/router'

// import Tables from 'layouts/tables'
import BiddingBoard from './pages/bidding/index'

const routes = [
  {
    key: 'dashboard',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.DASHBOARD,
    component: Dashboard
  },
  {
    key: 'bidding',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.BIDDING,
    component: BiddingBoard
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
    key: 'billing',
    type: TYPE_ROUTER.PRIVATE,
    route: '/billing',
    component: Billing
  },
  {
    key: 'product-detail',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.PRODUCT_DETAIL + '/:id',
    component: ProductDetail
  },
  {
    key: 'category-manager',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.CATEGORY_MANAGER,
    component: CategoryManager
  },
  {
    key: 'category-manager-new',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.CATEGORY_MANAGER_NEW,
    component: NewCategory
  },
  {
    key: 'category-manager-edit',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.CATEGORY_MANAGER_EDIT + '/:id',
    component: EditCategory
  },
  {
    key: 'user-manager',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.USER_MANAGER,
    component: UserManager
  },
  {
    key: 'user-manager-edit',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.USER_MANAGER_EDIT + '/:id',
    component: EditUser
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
  },
  {
    key: 'forgot-password',
    type: TYPE_ROUTER.AUTHENTICATION,
    route: ROUTER_DEFAULT.FORGOT_PASSWORD,
    component: ForgotPassword
  },
  {
    key: 'reset-password',
    type: TYPE_ROUTER.AUTHENTICATION,
    route: ROUTER_DEFAULT.RESET_PASSWORD,
    component: ResetPassword
  }
]

export default routes
