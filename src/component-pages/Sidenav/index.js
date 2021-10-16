import { useEffect } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'

// @material-ui core components
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import Link from '@material-ui/core/Link'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiButton from 'components/SuiButton'

// Soft UI Dashboard Material-UI example components
import SidenavCollapse from 'component-pages/Sidenav/SidenavCollapse'
import SidenavCard from 'component-pages/Sidenav/SidenavCard'

// Custom styles for the Sidenav
import styles from 'component-pages/Sidenav/styles/sidenav'

// Images
import SoftUILogo from 'assets/images/logo-ct.png'

import { useSoftUIController } from 'context'

function Sidenav({ routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController()
  const { miniSidenav, transparentSidenav } = controller
  const classes = styles({ miniSidenav, transparentSidenav })
  const location = useLocation()
  const { pathname } = location
  const collapseName = pathname.split('/').slice(1)[0]
  const isAuthentication = collapseName === 'authentication'

  const closeSizenav = () => dispatch({ type: 'MINI_SIDENAV', value: true })

  useEffect(() => {
    function handleMiniSidenav() {
      dispatch({ type: 'MINI_SIDENAV', value: window.innerWidth < 1200 })
    }

    // The event listener that's calling the handleMiniSidenav function when resizing the window.
    window.addEventListener('resize', handleMiniSidenav)

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav()

    return () => window.removeEventListener('resize', handleMiniSidenav)
  }, [dispatch, location])

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, route, href }) => {
    let returnValue

    if (type === 'collapse') {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          className={classes.sidenav_navlink}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink to={route} key={key} className={classes.sidenav_navlink}>
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </NavLink>
      )
    } else if (type === 'title') {
      returnValue = (
        <SuiTypography
          key={key}
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          customClass={classes.sidenav_title}
        >
          {title}
        </SuiTypography>
      )
    } else if (type === 'divider') {
      returnValue = <Divider key={key} />
    }

    return returnValue
  })
  if (isAuthentication) return <></>

  return (
    <Drawer
      {...rest}
      variant="permanent"
      classes={{
        paper: clsx(classes.sidenav, {
          [classes.sidenav_open]: !miniSidenav,
          [classes.sidenav_close]: miniSidenav
        })
      }}
    >
      <SuiBox customClass={classes.sidenav_header}>
        <SuiBox
          display={{ xs: 'block', xl: 'none' }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          customClass="cursor-pointer"
          onClick={closeSizenav}
        >
          <SuiTypography variant="h6" textColor="secondary">
            <Icon className="material-icons-round font-bold">close</Icon>
          </SuiTypography>
        </SuiBox>
        <NavLink to="/">
          <SuiBox
            component="img"
            src={SoftUILogo}
            alt="Soft UI Logo"
            customClass={classes.sidenav_logo}
          />
          <SuiBox customClass={classes.sidenav_logoLabel}>
            <SuiTypography component="h6" variant="button" fontWeight="medium">
              Soft UI Dashboard
            </SuiTypography>
          </SuiBox>
        </NavLink>
      </SuiBox>
      <Divider />
      <List>{renderRoutes}</List>
      <SuiBox customClass={classes.sidenav_footer}>
        <SidenavCard />
        <SuiBox mt={2}>
          <SuiButton
            component="a"
            href="https://creative-tim.com/product/soft-ui-dashboard-pro-material-ui"
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            buttonColor="info"
            fullWidth
          >
            upgrade to pro
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </Drawer>
  )
}

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Sidenav
