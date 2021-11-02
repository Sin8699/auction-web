import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import Container from '@material-ui/core/Container'
import Icon from '@material-ui/core/Icon'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import NavbarLink from 'layouts/authentication/components/Header/ViewDefault'
import NavbarMobile from 'layouts/authentication/components/Header/ViewMobile'

import breakpoints from 'assets/theme/base/breakpoints'

import {ROUTER_DEFAULT} from 'constants/router'

import styles from './styles'

function Header({transparent, light}) {
  const classes = styles({transparent, light})
  const [mobileNavbar, setMobileNavbar] = useState(false)
  const [mobileView, setMobileView] = useState(false)

  const openMobileNavbar = ({currentTarget}) => setMobileNavbar(currentTarget.parentNode)
  const closeMobileNavbar = () => setMobileNavbar(false)

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true)
        setMobileNavbar(false)
      } else {
        setMobileView(false)
        setMobileNavbar(false)
      }
    }
    window.addEventListener('resize', displayMobileNavbar)

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar()

    return () => window.removeEventListener('resize', displayMobileNavbar)
  }, [])

  return (
    <Container>
      <SuiBox
        customClass={classes.defaultNavbar}
        py={1}
        px={{xs: transparent ? 4 : 5, sm: transparent ? 2 : 5, lg: transparent ? 0 : 5}}
      >
        <SuiBox component={Link} to="#" py={transparent ? 1.5 : 0.75}>
          <SuiTypography variant="button" fontWeight="bold" textColor={light ? 'white' : 'dark'}>
            Auction web
          </SuiTypography>
        </SuiBox>
        <SuiBox color="inherit" display={{xs: 'none', lg: 'flex'}} m={0} p={0}>
          <NavbarLink
            icon="person_add"
            name="sign up"
            route={ROUTER_DEFAULT.SIGN_UP}
            light={light}
          />
          <NavbarLink icon="key" name="sign in" route={ROUTER_DEFAULT.SIGN_IN} light={light} />
        </SuiBox>
        <SuiBox
          display={{xs: 'inline-block', lg: 'none'}}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          customClass="cursor-pointer"
          onClick={openMobileNavbar}
        >
          <Icon className="material-icons-round" fontSize="medium">
            {mobileNavbar ? 'close' : 'menu'}
          </Icon>
        </SuiBox>
      </SuiBox>
      {mobileView && <NavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  )
}

Header.defaultProps = {transparent: false, light: false}

Header.propTypes = {transparent: PropTypes.bool, light: PropTypes.bool} // Typechecking props for the DefaultNavbar

export default Header
