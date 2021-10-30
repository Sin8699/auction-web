import {forwardRef} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import LinearProgress from '@material-ui/core/LinearProgress'
import SuiTypography from 'components/SuiTypography'
import styles from 'components/SuiProgress/styles'

const SuiProgress = forwardRef(({color, value, gradient, noLabel, ...rest}, ref) => {
  const classes = styles({color, value})

  return (
    <>
      {!noLabel && (
        <SuiTypography variant="button" fontWeight="medium" textColor="text">
          {value}%
        </SuiTypography>
      )}
      <LinearProgress
        {...rest}
        ref={ref}
        variant="determinate"
        value={value}
        className={clsx(classes.progress, {
          [classes.progress_gradient]: gradient
        })}
      />
    </>
  )
})

SuiProgress.defaultProps = {color: 'info', value: 0, gradient: false, noLabel: false}

SuiProgress.propTypes = {
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
  value: PropTypes.number,
  gradient: PropTypes.bool,
  noLabel: PropTypes.bool
}

export default SuiProgress
