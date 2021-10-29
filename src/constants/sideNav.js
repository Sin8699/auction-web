import Shop from 'component-pages/Icons/Shop'
import Office from 'component-pages/Icons/Office'
import Basket from 'component-pages/Icons/Basket'
import Cube from 'component-pages/Icons/Cube'
import CreditCard from 'component-pages/Icons/CreditCard'
import Document from 'component-pages/Icons/Document'
import CustomerSupport from 'component-pages/Icons/CustomerSupport'
import {ROUTER_DEFAULT} from 'constants/router'

const ItemSideNav = [
  {
    type: 'collapse',
    name: 'Dashboard',
    key: 'dashboard',
    route: '/dashboard',
    icon: <Shop size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Favorite Product',
    key: 'favorite-product',
    route: ROUTER_DEFAULT.FAVORITE,
    icon: <Cube size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'History Product',
    key: 'history-product',
    route: ROUTER_DEFAULT.HISTORY,
    icon: <Document size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'ProductDetail',
    key: 'product-detail',
    route: '/product-detail/:id',
    icon: <Basket size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Category manager',
    key: 'category-manager',
    route: ROUTER_DEFAULT.CATEGORY_MANAGER,
    icon: <Office size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Billing',
    key: 'billing',
    route: '/billing',
    icon: <CreditCard size="12px" />,
    noCollapse: true
  }
  // {type: 'title', title: 'Account Pages', key: 'account-pages'},  }
]

export default ItemSideNav
