import {useState, useEffect} from 'react'

// clsx is a utility for constructing className strings conditionally
import clsx from 'clsx'

import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import Switch from '@material-ui/core/Switch'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import Icon from '@material-ui/core/Icon'

import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiButton from 'components/SuiButton'

// Custom styles for the Configurator
import styles from 'component-pages/Configurator/styles'

// Soft UI Dashboard Material-UI context
import {useSoftUIController} from 'context'

function Configurator() {
  const [controller, dispatch] = useSoftUIController()
  const {openConfigurator, transparentSidenav, fixedNavbar, sidenavColor} = controller
  const [disabled, setDisabled] = useState(false)
  const classes = styles({sidenavColor})
  const sidenavColors = ['primary', 'dark', 'info', 'success', 'warning', 'error']

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true)
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener('resize', handleDisabled)

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleDisabled)
  }, [])

  const handleCloseConfigurator = () => {
    dispatch({type: 'OPEN_CONFIGURATOR', value: false})
  }

  const handleTransparentSidenav = () => {
    dispatch({type: 'TRANSPARENT_SIDENAV', value: true})
  }

  const handleWhiteSidenav = () => {
    dispatch({type: 'TRANSPARENT_SIDENAV', value: false})
  }

  const handleFixedNavbar = () => {
    dispatch({type: 'FIXED_NAVBAR', value: !fixedNavbar})
  }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.configurator, {
          [classes.configurator_open]: openConfigurator,
          [classes.configurator_close]: !openConfigurator
        })
      }}
    >
      <SuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <SuiBox>
          <SuiTypography variant="h5">Soft UI Configurator</SuiTypography>
          <SuiTypography variant="body2" textColor="text">
            See our dashboard options.
          </SuiTypography>
        </SuiBox>

        <Icon
          className={`material-icons-round font-bold ${classes.configurator_close_icon}`}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </SuiBox>

      <Divider />

      <SuiBox pt={1.25} pb={3} px={3}>
        <SuiBox>
          <SuiTypography variant="h6">Sidenav Colors</SuiTypography>

          <SuiBox my={0.5}>
            {sidenavColors.map(color => (
              <IconButton
                key={color}
                className={clsx(classes.configurator_sidenav_color, classes[color], {
                  [classes.active_color]: sidenavColor === color
                })}
                onClick={() => dispatch({type: 'SIDENAV_COLOR', value: color})}
              />
            ))}
          </SuiBox>
        </SuiBox>

        <SuiBox mt={3}>
          <SuiTypography variant="h6">Sidenav Type</SuiTypography>
          <SuiTypography variant="button" textColor="text" fontWeight="regular">
            Choose between 2 different sidenav types.
          </SuiTypography>

          <SuiBox customClass={classes.configurator_sidenav_types}>
            <SuiButton
              buttonColor="info"
              variant={transparentSidenav ? 'gradient' : 'outlined'}
              onClick={handleTransparentSidenav}
              disabled={disabled}
              fullWidth
            >
              Transparent
            </SuiButton>
            <SuiButton
              buttonColor="info"
              variant={transparentSidenav ? 'outlined' : 'gradient'}
              onClick={handleWhiteSidenav}
              disabled={disabled}
              fullWidth
            >
              White
            </SuiButton>
          </SuiBox>
        </SuiBox>
        <SuiBox mt={3} mb={2}>
          <SuiTypography variant="h6">Navbar Fixed</SuiTypography>

          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </SuiBox>

        <Divider />

        <SuiBox mt={3} mb={2}>
          <SuiBox mb={2}>
            <SuiButton
              component={Link}
              href="https://www.creative-tim.com/product/soft-ui-dashboard-material-ui"
              target="_blank"
              rel="noreferrer"
              buttonColor="dark"
              variant="gradient"
              fullWidth
            >
              free download
            </SuiButton>
          </SuiBox>
          <SuiButton
            component={Link}
            href="https://www.creative-tim.com/learning-lab/material-ui/quick-start/soft-ui-dashboard"
            target="_blank"
            rel="noreferrer"
            buttonColor="dark"
            variant="outlined"
            fullWidth
          >
            view documentation
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiBox mb={0.5}>
            <SuiTypography variant="h6">Thank you for sharing!</SuiTypography>
          </SuiBox>

          <SuiBox display="flex" justifyContent="center">
            <SuiBox mr={1.5}>
              <SuiButton
                component={Link}
                href="//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20%20Material-UI%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-pro-material"
                target="_blank"
                rel="noreferrer"
                buttonColor="dark"
              >
                <TwitterIcon />
                &nbsp; Tweet
              </SuiButton>
            </SuiBox>
            <SuiButton
              component={Link}
              href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/soft-ui-dashboard-material-ui"
              target="_blank"
              rel="noreferrer"
              buttonColor="dark"
            >
              <FacebookIcon />
              &nbsp; Share
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Drawer>
  )
}

export default Configurator
