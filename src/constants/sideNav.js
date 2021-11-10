import Cube from 'component-pages/Icons/Cube'
import Shop from 'component-pages/Icons/Shop'
import Basket from 'component-pages/Icons/Basket'
import Office from 'component-pages/Icons/Office'
import Document from 'component-pages/Icons/Document'
// import Settings from 'component-pages/Icons/Settings'
// import SpaceShip from 'component-pages/Icons/SpaceShip'
// import CreditCard from 'component-pages/Icons/CreditCard'
import CustomerSupport from 'component-pages/Icons/CustomerSupport'

import {SupervisorAccount, Favorite, History} from '@material-ui/icons'

import {ROUTER_DEFAULT} from 'constants/router'

export const ItemSideNavForBidder = [
  {type: 'title', title: 'Bidder', key: 'account-pages'},
  {
    type: 'collapse',
    name: 'Home',
    key: 'dashboard',
    route: ROUTER_DEFAULT.DASHBOARD,
    icon: <Shop size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Bidding',
    key: 'bidding',
    route: ROUTER_DEFAULT.BIDDING,
    icon: <Basket size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Favorite Product',
    key: 'favorite',
    route: ROUTER_DEFAULT.FAVORITE,
    icon: <Favorite size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'History Product',
    key: 'history',
    route: ROUTER_DEFAULT.HISTORY,
    icon: <History size="12px" />,
    noCollapse: true
  }
]

export const ItemSideNavForSeller = [
  {type: 'title', title: 'Seller', key: 'account-pages'},
  {
    type: 'collapse',
    name: 'My product',
    key: 'seller/manager/product',
    route: ROUTER_DEFAULT.PRODUCT_MANAGER_SELLER,
    icon: <Cube size="12px" />,
    noCollapse: true
  }
]
export const ItemSideNavForAdmin = [
  {type: 'title', title: 'Manager', key: 'account-pages'},
  {
    type: 'collapse',
    name: 'Category manager',
    key: 'admin/manager/category',
    route: ROUTER_DEFAULT.CATEGORY_MANAGER,
    icon: <Office size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Sub category manager',
    key: 'admin/manager/subcategory',
    route: ROUTER_DEFAULT.SUB_CATEGORY_MANAGER,
    icon: <Document size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'User manager',
    key: 'admin/manager/user',
    route: ROUTER_DEFAULT.USER_MANAGER,
    icon: <SupervisorAccount size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Product manager',
    key: 'admin/manager/product',
    route: ROUTER_DEFAULT.PRODUCT_MANAGER_ADMIN,
    icon: <Cube size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Request upgrade',
    key: 'admin/manager/request-upgrade',
    route: ROUTER_DEFAULT.REQUEST_UPGRADE_MANAGER_ADMIN,
    icon: <CustomerSupport size="12px" />,
    noCollapse: true
  }
]

const ItemSideNav = [
  {
    type: 'collapse',
    name: 'Home',
    key: 'dashboard',
    route: ROUTER_DEFAULT.DASHBOARD,
    icon: <Shop size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Bidding',
    key: 'bidding',
    route: ROUTER_DEFAULT.BIDDING,
    icon: <Basket size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Favorite Product',
    key: 'favorite',
    route: ROUTER_DEFAULT.FAVORITE,
    icon: <Favorite size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'History Product',
    key: 'history',
    route: ROUTER_DEFAULT.HISTORY,
    icon: <History size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'My product',
    key: 'seller/manager/product',
    route: ROUTER_DEFAULT.PRODUCT_MANAGER_SELLER,
    icon: <Cube size="12px" />,
    noCollapse: true
  },

  {type: 'title', title: 'Manager', key: 'account-pages'},
  {
    type: 'collapse',
    name: 'Category manager',
    key: 'admin/manager/category',
    route: ROUTER_DEFAULT.CATEGORY_MANAGER,
    icon: <Office size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Sub category manager',
    key: 'admin/manager/subcategory',
    route: ROUTER_DEFAULT.SUB_CATEGORY_MANAGER,
    icon: <Document size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'User manager',
    key: 'admin/manager/user',
    route: ROUTER_DEFAULT.USER_MANAGER,
    icon: <SupervisorAccount size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Product manager',
    key: 'admin/manager/product',
    route: ROUTER_DEFAULT.PRODUCT_MANAGER_ADMIN,
    icon: <Cube size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Request upgrade',
    key: 'admin/manager/request-upgrade',
    route: ROUTER_DEFAULT.REQUEST_UPGRADE_MANAGER_ADMIN,
    icon: <CustomerSupport size="12px" />,
    noCollapse: true
  }
]

export default ItemSideNav
