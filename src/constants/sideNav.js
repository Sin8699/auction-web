// Soft UI Dashboard Material-UI icons
import Shop from 'component-pages/Icons/Shop'
import Office from 'component-pages/Icons/Office'
import Basket from 'component-pages/Icons/Basket'
import CustomerSupport from 'component-pages/Icons/CustomerSupport'
import CreditCard from 'component-pages/Icons/CreditCard'

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
    name: 'ProductDetail',
    key: 'product-detail',
    route: '/product-detail/:id',
    icon: <Basket size="12px" />,
    noCollapse: true
  },
  {
    type: 'collapse',
    name: 'Tables',
    key: 'tables',
    route: '/tables',
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
  },
  { type: 'title', title: 'Account Pages', key: 'account-pages' },
  {
    type: 'collapse',
    name: 'Profile',
    key: 'profile',
    route: '/profile',
    icon: <CustomerSupport size="12px" />,
    noCollapse: true
  }
]

export default ItemSideNav
