import { useEffect } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { create } from 'jss'
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Sidenav from 'component-pages/Sidenav'
import theme from 'assets/theme'
import routes from 'routes'
import ItemSideNav from 'constants/sideNav'
import { TYPE_ROUTER, ROUTER_DEFAULT } from 'constants/router'
import { loadFromStorage } from 'utils/storage'
import SocketContainer from './context/socket/SocketIOProvider'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const accessToken = loadFromStorage('isLogin') || '' // change after done function login

  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? <Component {...props} /> : <Redirect to={ROUTER_DEFAULT.SIGN_IN} />
      }
    />
  )
}

const AuthenticationRoute = ({ component: Component, ...rest }) => {
  const accessToken = loadFromStorage('isLogin') || false // change after done function login

  return (
    <Route
      {...rest}
      render={(props) =>
        !accessToken ? <Component {...props} /> : <Redirect to={ROUTER_DEFAULT.DASHBOARD} />
      }
    />
  )
}

export default function App() {
  const { pathname } = useLocation()

  // JSS presets
  const jss = create({ plugins: [...jssPreset().plugins] })

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
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

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <SocketContainer>
          <CssBaseline />
          <Sidenav routes={ItemSideNav} />
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/dashboard" />
          </Switch>
        </SocketContainer>
      </ThemeProvider>
    </StylesProvider>
  )
}
