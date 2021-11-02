import {forwardRef} from 'react'

import clsx from 'clsx'

import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'

import styles from 'components/SuiAvatar/styles'

const SuiAvatar = forwardRef(({backgroundColor, size, boxShadow, customClass, ...rest}, ref) => {
  const classes = styles({boxShadow, backgroundColor})

  return (
    <Avatar
      ref={ref}
      {...rest}
      className={clsx(classes.suiAvatar, customClass, {
        [classes[`suiAvatar_${size}`]]: size,
        [classes.suiAvatar_boxShadow]: boxShadow !== 'none'
      })}
    />
  )
})

// Setting default values for the props of SuiAvatar
SuiAvatar.defaultProps = {
  backgroundColor: 'transparent',
  size: 'md',
  boxShadow: 'none',
  customClass: ''
}

// Typechecking props for the SuiAvatar
SuiAvatar.propTypes = {
  backgroundColor: PropTypes.oneOf([
    'transparent',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  boxShadow: PropTypes.oneOf(['none', 'xs', 'sm', 'regular', 'lg', 'xl', 'xxl', 'inset']),
  customClass: PropTypes.string
}

export default SuiAvatar
