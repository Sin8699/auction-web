import Shop from 'component-pages/Icons/Shop'
import Office from 'component-pages/Icons/Office'
import Basket from 'component-pages/Icons/Basket'
import Cube from 'component-pages/Icons/Cube'
import CreditCard from 'component-pages/Icons/CreditCard'
import Document from 'component-pages/Icons/Document'
import SupervisorAccount from '@material-ui/icons/SupervisorAccount'
import { ROUTER_DEFAULT } from 'constants/router'

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
    key: 'favorite',
    route: ROUTER_DEFAULT.FAVORITE,
    icon: <Cube size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'History Product',
    key: 'history',
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
    name: 'Billing',
    key: 'billing',
    route: '/billing',
    icon: <CreditCard size="12px" />,
    noCollapse: true
  },
  { type: 'title', title: 'Manager', key: 'account-pages' },
  {
    type: 'collapse',
    name: 'Category manager',
    key: 'manager/category',
    route: ROUTER_DEFAULT.CATEGORY_MANAGER,
    icon: <Office size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'User manager',
    key: 'manager/user',
    route: ROUTER_DEFAULT.USER_MANAGER,
    icon: <SupervisorAccount size="12px" />,
    noCollapse: true
  }
]

export default ItemSideNav
