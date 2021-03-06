import {useState, useEffect} from 'react'
import {useLocation, Link, useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'

import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import Icon from '@material-ui/core/Icon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'

import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import SuiBox from 'components/SuiBox'

import Breadcrumbs from 'component-pages/Breadcrumbs'
import styles from 'component-pages/Header/styles'

import {useSoftUIController} from 'context'
import {ROUTER_DEFAULT} from 'constants/router'

import {removeFromStorage} from 'utils/storage'

const ItemIconList = withStyles(theme => ({
  root: {minWidth: 0, marginRight: 10}
}))(ListItemIcon)

const Header = ({absolute, light}) => {
  const history = useHistory()
  const [navbarType, setNavbarType] = useState()
  const [openMenu, setOpenMenu] = useState(false)
  const [controller, dispatch] = useSoftUIController()
  const {miniSidenav, transparentNavbar, fixedNavbar} = controller
  const classes = styles({transparentNavbar, absolute, light})
  const route = useLocation().pathname.split('/').slice(1)
  useEffect(() => {
    fixedNavbar ? setNavbarType('sticky') : setNavbarType('static')

    function handleTransparentNavbar() {
      dispatch({
        type: 'TRANSPARENT_NAVBAR',
        value: (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      })
    }
    window.addEventListener('scroll', handleTransparentNavbar)
    handleTransparentNavbar()
    return () => window.removeEventListener('scroll', handleTransparentNavbar)
  }, [dispatch, fixedNavbar])
  const handleMiniSidenav = () => dispatch({type: 'MINI_SIDENAV', value: !miniSidenav})
  const handleOpenMenu = event => setOpenMenu(event.currentTarget)
  const handleCloseMenu = () => setOpenMenu(false)
  const handleSignOut = () => {
    removeFromStorage('user')
    history.replace(ROUTER_DEFAULT.SIGN_IN)
  }

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      getContentAnchorEl={null}
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      style={{marginTop: '1rem'}}
    >
      <Link to="/profile">
        <MenuItem onClick={handleCloseMenu}>
          <ItemIconList>
            <PersonIcon fontSize="small" />
          </ItemIconList>
          <Typography variant="inherit">Profile</Typography>
        </MenuItem>
      </Link>
      <MenuItem onClick={handleSignOut}>
        <ItemIconList>
          <ExitToAppIcon fontSize="small" />
        </ItemIconList>
        <Typography variant="inherit">Sign Out</Typography>
      </MenuItem>
    </Menu>
  )

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color="inherit"
      className={classes.navbar}
    >
      <Toolbar className={classes.navbar_container}>
        <SuiBox customClass={classes.navbar_row} color="inherit" mb={{xs: 1, md: 0}}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SuiBox>
        <SuiBox customClass={classes.navbar_row}>
          <SuiBox color={light ? 'white' : 'inherit'} customClass={classes.navbar_row}>
            <IconButton
              color="inherit"
              className={classes.navbar_mobile_menu}
              onClick={handleMiniSidenav}
            >
              <Icon className="material-icons-round">{miniSidenav ? 'menu_open' : 'menu'}</Icon>
            </IconButton>
          </SuiBox>
          <SuiBox color="white" customClass={classes.navbar_section_desktop}>
            <IconButton className={classes.navbar_icon_button} onClick={handleOpenMenu}>
              <Icon className={`material-icons-round ${light ? 'text-white' : 'text-dark'}`}>
                account_circle
              </Icon>
            </IconButton>
            {renderMenu()}
          </SuiBox>
        </SuiBox>
      </Toolbar>
    </AppBar>
  )
}

Header.defaultProps = {absolute: false, light: false}

Header.propTypes = {absolute: PropTypes.bool, light: PropTypes.bool}

export default Header
