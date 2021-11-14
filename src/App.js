import {useEffect} from 'react'
import {Provider} from 'react-redux'
import {Route, Switch, Redirect, useLocation} from 'react-router-dom'
import {create} from 'jss'
import {ThemeProvider, StylesProvider, jssPreset} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Sidenav from 'component-pages/Sidenav'
import SuiAlert from 'components/SuiAlert'
import theme from 'assets/theme'
import routes from 'routes'
import ItemSideNav from 'constants/sideNav'
// import {ItemSideNavForBidder, ItemSideNavForSeller, ItemSideNavForAdmin} from 'constants/sideNav'
import {TYPE_ROUTER, ROUTER_DEFAULT} from 'constants/router'
import {loadFromStorage} from 'utils/storage'
import SocketContainer from './context/socket/SocketIOProvider'
import appStore from './redux/store'
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3'

const PrivateRoute = ({component: Component, ...rest}) => {
  const {accessToken} = loadFromStorage('user') || {}

  return (
    <Route
      {...rest}
      render={props =>
        accessToken ? <Component {...props} /> : <Redirect to={ROUTER_DEFAULT.SIGN_IN} />
      }
    />
  )
}

const AuthenticationRoute = ({component: Component, ...rest}) => {
  const {accessToken} = loadFromStorage('user') || {}

  return (
    <Route
      {...rest}
      render={props =>
        !accessToken ? <Component {...props} /> : <Redirect to={ROUTER_DEFAULT.DASHBOARD} />
      }
    />
  )
}

export default function App() {
  const {pathname} = useLocation()

  // JSS presets
  const jss = create({plugins: [...jssPreset().plugins]})

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  const getRoutes = allRoutes =>
    allRoutes.map(route => {
      if (route.route) {
        if (route.type === TYPE_ROUTER.PRIVATE)
          return (
            <PrivateRoute exact path={route.route} component={route.component} key={route.key} />
          )
        else if (route.type === TYPE_ROUTER.AUTHENTICATION)
          return (
            <AuthenticationRoute
              exact
              path={route.route}
              component={route.component}
              key={route.key}
            />
          )
        return <Route exact path={route.route} component={route.component} key={route.key} />
      }
      return null
    })

  // const { role } = loadFromStorage('user') || ''

  return (
    <Provider store={appStore}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <GoogleReCaptchaProvider reCaptchaKey="6Ld-vSkdAAAAAArlF6mtvQ0mP6xdmhWsrC5-OLfy">
            <SocketContainer>
              <CssBaseline />
              <SuiAlert />
              <Sidenav routes={ItemSideNav} />
              {/* <Sidenav
              routes={
                role === 'ADMIN'
                  ? ItemSideNavForAdmin
                  : role === 'SELLER'
                  ? ItemSideNavForSeller
                  : role === 'BIDDER'
                  ? ItemSideNavForBidder
                  : ItemSideNav
              }
            /> */}
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/dashboard" />
              </Switch>
            </SocketContainer>
          </GoogleReCaptchaProvider>
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  )
}
