import {useState, useEffect} from 'react'

import {Link} from 'react-router-dom'

import PropTypes from 'prop-types'

import Container from '@material-ui/core/Container'
import Icon from '@material-ui/core/Icon'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiButton from 'components/SuiButton'

import DefaultNavbarLink from 'component-pages/Navbars/DefaultNavbar/DefaultNavbarLink'
import DefaultNavbarMobile from 'component-pages/Navbars/DefaultNavbar/DefaultNavbarMobile'

import breakpoints from 'assets/theme/base/breakpoints'

import styles from 'component-pages/Navbars/DefaultNavbar/styles/defaultNavbar'

function DefaultNavbar({transparent, light, action}) {
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

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener('resize', displayMobileNavbar)

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', displayMobileNavbar)
  }, [])

  return (
    <Container>
      <SuiBox
        customClass={classes.defaultNavbar}
        py={1}
        px={{xs: transparent ? 4 : 5, sm: transparent ? 2 : 5, lg: transparent ? 0 : 5}}
      >
        <SuiBox component={Link} to="/" py={transparent ? 1.5 : 0.75}>
          <SuiTypography variant="button" fontWeight="bold" textColor={light ? 'white' : 'dark'}>
            Soft UI Dashboard
          </SuiTypography>
        </SuiBox>
        <SuiBox color="inherit" display={{xs: 'none', lg: 'flex'}} m={0} p={0}>
          <DefaultNavbarLink icon="donut_large" name="dashboard" route="/dashboard" light={light} />
          <DefaultNavbarLink icon="person" name="profile" route="/profile" light={light} />
          <DefaultNavbarLink
            icon="account_circle"
            name="sign up"
            route="/authentication/sign-up"
            light={light}
          />
          <DefaultNavbarLink
            icon="key"
            name="sign in"
            route="/authentication/sign-in"
            light={light}
          />
        </SuiBox>
        {action &&
          (action.type === 'internal' ? (
            <SuiBox display={{xs: 'none', lg: 'inline-block'}}>
              <SuiButton
                component={Link}
                to={action.route}
                variant="gradient"
                buttonColor={action.color ? action.color : 'info'}
                size="small"
                circular
              >
                {action.label}
              </SuiButton>
            </SuiBox>
          ) : (
            <SuiBox display={{xs: 'none', lg: 'inline-block'}}>
              <SuiButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                buttonColor={action.color ? action.color : 'info'}
                size="small"
                circular
              >
                {action.label}
              </SuiButton>
            </SuiBox>
          ))}
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
      {mobileView && (
        <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar}>
          Hello
        </DefaultNavbarMobile>
      )}
    </Container>
  )
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false
}

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(['external', 'internal']).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
        'dark',
        'light',
        'white'
      ]),
      label: PropTypes.string.isRequired
    })
  ])
}

export default DefaultNavbar
