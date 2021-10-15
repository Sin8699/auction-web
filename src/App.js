import { useEffect } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { create } from 'jss'
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Sidenav from 'component-pages/Sidenav'
import theme from 'assets/theme'
import routes from 'routes'

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
        <Sidenav routes={routes} />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </ThemeProvider>
    </StylesProvider>
  )
}
