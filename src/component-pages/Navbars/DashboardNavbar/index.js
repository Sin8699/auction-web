import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import Icon from '@material-ui/core/Icon'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import Breadcrumbs from 'component-pages/Breadcrumbs'
import NotificationItem from 'component-pages/NotificationItem'
import styles from 'component-pages/Navbars/DashboardNavbar/styles'
import { useSoftUIController } from 'context'
import team2 from 'assets/images/team-2.jpg'
import logoSpotify from 'assets/images/small-logos/logo-spotify.svg'

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState()
  const [controller, dispatch] = useSoftUIController()
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller
  const [openMenu, setOpenMenu] = useState(false)
  const classes = styles({ transparentNavbar, absolute, light, isMini })
  const route = useLocation().pathname.split('/').slice(1)

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky')
    } else {
      setNavbarType('static')
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      dispatch({
        type: 'TRANSPARENT_NAVBAR',
        value: (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      })
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener('scroll', handleTransparentNavbar)

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar()

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar)
  }, [dispatch, fixedNavbar])

  const handleMiniSidenav = () => dispatch({ type: 'MINI_SIDENAV', value: !miniSidenav })
  const handleConfiguratorOpen = () =>
    dispatch({ type: 'OPEN_CONFIGURATOR', value: !openConfigurator })
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget)
  const handleCloseMenu = () => setOpenMenu(false)

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      style={{ marginTop: '1rem' }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={['New message', 'from Laur']}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={['New album', 'by Travis Scott']}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" className="material-icon-round text-white">
            payment
          </Icon>
        }
        title={['', 'Payment successfully completed']}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  )

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color="inherit"
      className={classes.navbar}
    >
      <Toolbar className={classes.navbar_container}>
        <SuiBox customClass={classes.navbar_row} color="inherit" mb={{ xs: 1, md: 0 }}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SuiBox>
        {isMini ? null : (
          <SuiBox customClass={classes.navbar_row}>
            <SuiBox pr={1}>
              <SuiInput
                placeholder="Type here..."
                withIcon={{ icon: 'search', direction: 'left' }}
                customClass={classes.navbar_input}
              />
            </SuiBox>
            <SuiBox
              color={light ? 'white' : 'inherit'}
              customClass={classes.navbar_section_desktop}
            >
              <Link to="/authentication/sign-in/basic">
                <IconButton className={classes.navbar_icon_button}>
                  <Icon className={`material-icons-round ${light ? 'text-white' : 'text-dark'}`}>
                    account_circle
                  </Icon>
                  <SuiTypography
                    variant="button"
                    fontWeight="medium"
                    textColor={light ? 'white' : 'dark'}
                  >
                    Sign in
                  </SuiTypography>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                color="inherit"
                className={classes.navbar_mobile_menu}
                onClick={handleMiniSidenav}
              >
                <Icon className="material-icons-round">{miniSidenav ? 'menu_open' : 'menu'}</Icon>
              </IconButton>
              <IconButton
                color="inherit"
                className={classes.navbar_icon_button}
                onClick={handleConfiguratorOpen}
              >
                <Icon className="material-icons-round">settings</Icon>
              </IconButton>
              <IconButton
                color="inherit"
                className={classes.navbar_icon_button}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon className="material-icons-round">notifications</Icon>
              </IconButton>
              {renderMenu()}
            </SuiBox>
          </SuiBox>
        )}
      </Toolbar>
    </AppBar>
  )
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false
}

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool
}

export default DashboardNavbar