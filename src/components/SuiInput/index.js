import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import InputBase from '@material-ui/core/InputBase'
import Icon from '@material-ui/core/Icon'

import SuiBox from 'components/SuiBox'

import styles from 'components/SuiInput/styles'

import { useSoftUIController } from 'context'

const SuiInput = forwardRef(
  ({ size, withIcon, error, success, customClass, disabled, ...rest }, ref) => {
    let template
    const [controller] = useSoftUIController()
    const { direction } = controller
    const classes = styles({ size, error, success, withIcon, direction, disabled })

    if (withIcon.icon && withIcon.direction === 'left') {
      template = (
        <SuiBox ref={ref} customClass={clsx(classes.suiInputIcon, customClass)}>
          <SuiBox customClass={classes.suiInputIcon_Right}>
            <Icon className={`material-icons-round ${classes.suiInputIcon_icon}`} fontSize="small">
              {withIcon.icon}
            </Icon>
          </SuiBox>
          <InputBase
            disabled={disabled}
            {...rest}
            className={clsx(classes.suiInput, classes.suiInputIcon_input, {
              [classes.suiInput_error]: error,
              [classes.suiInput_success]: success,
              [classes[`suiInput_${size}`]]: size
            })}
            classes={{
              focused: classes.suiInput_focused,
              disabled: classes.suiInput_disabled,
              error: classes.suiInput_error,
              multiline: classes.suiInput_multiline
            }}
          />
        </SuiBox>
      )
    } else if (withIcon.icon && withIcon.direction === 'right') {
      template = (
        <SuiBox customClass={clsx(classes.suiInputIcon, customClass)}>
          <InputBase
            disabled={disabled}
            {...rest}
            className={clsx(classes.suiInput, classes.suiInputIcon_input, {
              [classes.suiInput_error]: error,
              [classes.suiInput_success]: success,
              [classes[`suiInput_${size}`]]: size
            })}
            classes={{
              focused: classes.suiInput_focused,
              disabled: classes.suiInput_disabled,
              error: classes.suiInput_error,
              multiline: classes.suiInput_multiline
            }}
          />
          <SuiBox customClass={classes.suiInputIcon_Right}>
            <Icon className={`material-icons-round ${classes.suiInputIcon_icon}`} fontSize="small">
              {withIcon.icon}
            </Icon>
          </SuiBox>
        </SuiBox>
      )
    } else {
      template = (
        <InputBase
          disabled={disabled}
          {...rest}
          className={clsx(classes.suiInput, customClass, {
            [classes.suiInput_error]: error,
            [classes.suiInput_success]: success,
            [classes[`suiInput_${size}`]]: size
          })}
          classes={{
            focused: classes.suiInput_focused,
            disabled: classes.suiInput_disabled,
            error: classes.suiInput_error,
            multiline: classes.suiInput_multiline
          }}
        />
      )
    }

    return template
  }
)

// Setting default values for the props of SuiInput
SuiInput.defaultProps = {
  size: 'medium',
  withIcon: { icon: false, direction: 'none' },
  error: false,
  success: false,
  customClass: '',
  disabled: false
}

// Typechecking props for the SuiInput
SuiInput.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  withIcon: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(['none', 'left', 'right'])
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  customClass: PropTypes.string,
  disabled: PropTypes.bool
}

export default SuiInput
