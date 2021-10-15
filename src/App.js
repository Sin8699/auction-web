import { useState, useEffect } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { create } from 'jss'
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Sidenav from 'component-pages/Sidenav'
import theme from 'assets/theme'
import routes from 'routes'
import { useSoftUIController } from 'context'

export default function App() {
  const [controller, dispatch] = useSoftUIController()
  const { miniSidenav, openConfigurator } = controller
  // const { miniSidenav } = controller
  const [onMouseEnter, setOnMouseEnter] = useState(false)
  const { pathname } = useLocation()

  // JSS presets
  const jss = create({ plugins: [...jssPreset().plugins] })

  // // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      dispatch({ type: 'MINI_SIDENAV', value: false })
      setOnMouseEnter(true)
    }
  }

  // // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      dispatch({ type: 'MINI_SIDENAV', value: true })
      setOnMouseEnter(false)
    }
  }

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse)
      }
      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />
      }
      return null
    })

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Sidenav
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />

        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </ThemeProvider>
    </StylesProvider>
  )
}
