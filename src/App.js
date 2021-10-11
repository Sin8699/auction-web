import {useState, useEffect} from 'react'
import {Route, Switch, Redirect, useLocation} from 'react-router-dom'
import {create} from 'jss'
import {ThemeProvider, StylesProvider, jssPreset} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Icon from '@material-ui/core/Icon'
import SuiBox from 'components/SuiBox'
import Sidenav from 'component-pages/Sidenav'
import Configurator from 'component-pages/Configurator'
import theme from 'assets/theme'
import routes from 'routes'
import {useSoftUIController} from 'context'

export default function App() {
  const [controller, dispatch] = useSoftUIController()
  const {miniSidenav, layout, openConfigurator} = controller
  const [onMouseEnter, setOnMouseEnter] = useState(false)
  const {pathname} = useLocation()

  // JSS presets
  const jss = create({plugins: [...jssPreset().plugins]})

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      dispatch({type: 'MINI_SIDENAV', value: false})
      setOnMouseEnter(true)
    }
  }

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      dispatch({type: 'MINI_SIDENAV', value: true})
      setOnMouseEnter(false)
    }
  }

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => {
    dispatch({type: 'OPEN_CONFIGURATOR', value: !openConfigurator})
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

  const configsButton = (
    <SuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      backgroundColor="white"
      boxShadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      customClass="cursor-pointer"
      onClick={handleConfiguratorOpen}
    >
      <Icon className="material-icons-round text-dark" fontSize="medium">
        settings
      </Icon>
    </SuiBox>
  )

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === 'dashboard' && (
          <>
            <Sidenav
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === 'vr' && <Configurator />}
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </ThemeProvider>
    </StylesProvider>
  )
}
