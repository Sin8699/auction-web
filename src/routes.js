import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import SignUpSuccess from './pages/sign-up-success'
import ForgotPassword from './pages/forgot-password'
import ResetPassword from './pages/reset-password'
import VerifyError from './pages/verify-error'

import Dashboard from './pages/dashboard'

import Profile from './pages/profile'
import ProductDetail from './pages/product-detail'
import HistoryProducts from './pages/history-products'
import FavoriteProducts from './pages/favorite-products'
import ProductManagerSeller from './pages/product-manager-seller'
import NewProduct from './pages/product-manager-seller/new'
import EditProduct from './pages/product-manager-seller/edit'
import BiddingBoard from './pages/bidding'

import CategoryManager from './pages/category-manager'
import SubCategoryManager from './pages/subcategory-manager'
import UserManager from './pages/user-manager'
import ProductAdminManager from './pages/product-manager-admin'
import RequestUpgradeManager from './pages/request-upgrade-manage'

import {TYPE_ROUTER, ROUTER_DEFAULT} from 'constants/router'

const routes = [
  {
    key: 'dashboard',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.DASHBOARD,
    component: Dashboard
  },
  {
    key: 'profile',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.PROFILE,
    component: Profile
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
    key: 'product-manager-seller',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.PRODUCT_MANAGER_SELLER,
    component: ProductManagerSeller
  },
  {
    key: 'product-manager-seller-new',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.PRODUCT_MANAGER_SELLER_NEW,
    component: NewProduct
  },
  {
    key: 'product-manager-seller-new',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.PRODUCT_MANAGER_SELLER_EDIT + '/:id',
    component: EditProduct
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
    key: 'subcategory-manager',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.SUB_CATEGORY_MANAGER,
    component: SubCategoryManager
  },
  {
    key: 'user-manager',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.USER_MANAGER,
    component: UserManager
  },
  {
    key: 'product-manager-admin',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.PRODUCT_MANAGER_ADMIN,
    component: ProductAdminManager
  },
  {
    key: 'request-upgrade-manager-admin',
    type: TYPE_ROUTER.PRIVATE,
    route: ROUTER_DEFAULT.REQUEST_UPGRADE_MANAGER_ADMIN,
    component: RequestUpgradeManager
  },
  {
    key: 'sign-in',
    type: TYPE_ROUTER.AUTHENTICATION,
    route: ROUTER_DEFAULT.SIGN_IN,
    component: SignIn
  },
  {
    key: 'verify-error',
    type: TYPE_ROUTER.AUTHENTICATION,
    route: ROUTER_DEFAULT.VERIFY_ERROR,
    component: VerifyError
  },
  {
    key: 'sign-up',
    type: TYPE_ROUTER.AUTHENTICATION,
    route: ROUTER_DEFAULT.SIGN_UP,
    component: SignUp
  },
  {
    key: 'sign-up-success',
    type: TYPE_ROUTER.AUTHENTICATION,
    route: ROUTER_DEFAULT.SIGN_UP_SUCCESS,
    component: SignUpSuccess
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
