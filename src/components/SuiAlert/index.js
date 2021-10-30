import {useState} from 'react'

import PropTypes from 'prop-types'

import Fade from '@material-ui/core/Fade'

import SuiBox from 'components/SuiBox'

import styles from 'components/SuiAlert/styles'

function SuiAlert({color, dismissible, children, ...rest}) {
  const [alertStatus, setAlertStatus] = useState('mount')
  const classes = styles({color})

  const handleAlertStatus = () => setAlertStatus('fadeOut')

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <SuiBox {...rest} customClass={classes.alert}>
        <SuiBox display="flex" alignItems="center">
          {children}
        </SuiBox>
        {dismissible ? (
          <SuiBox
            component="span"
            customClass={classes.alert_closeIcon}
            onClick={mount ? handleAlertStatus : null}
          >
            &times;
          </SuiBox>
        ) : null}
      </SuiBox>
    </Fade>
  )

  switch (true) {
    case alertStatus === 'mount':
      return alertTemplate()
    case alertStatus === 'fadeOut':
      setTimeout(() => setAlertStatus('unmount'), 400)
      return alertTemplate(false)
    default:
      alertTemplate()
      break
  }

  return null
}

// Setting default values for the props of SuiAlert
SuiAlert.defaultProps = {
  color: 'info',
  dismissible: false
}

// Typechecking props of the SuiAlert
SuiAlert.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark'
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default SuiAlert
