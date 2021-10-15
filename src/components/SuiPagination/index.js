import { forwardRef, createContext } from 'react'
import PropTypes from 'prop-types'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import styles from 'components/SuiPagination/styles'

const Context = createContext()

const SuiPagination = forwardRef(
  ({ item, variant, color, size, active, children, ...rest }, ref) => {
    const classes = styles({ variant, active })
    return (
      <Context.Provider value={{ variant, color, size }}>
        {item ? (
          <SuiButton
            {...rest}
            ref={ref}
            variant={active ? variant : 'outlined'}
            buttonColor={active ? color : 'secondary'}
            iconOnly
            circular
            customClass={classes.suiPagination}
          >
            {children}
          </SuiButton>
        ) : (
          <SuiBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            customClass="no-list-style"
          >
            {children}
          </SuiBox>
        )}
      </Context.Provider>
    )
  }
)

// Setting default values for the props of SuiPagination
SuiPagination.defaultProps = {
  item: false,
  variant: 'gradient',
  color: 'info',
  size: 'medium',
  active: false
}

// Typechecking props for the SuiPagination
SuiPagination.propTypes = {
  item: PropTypes.bool,
  variant: PropTypes.oneOf(['gradient', 'contained']),
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
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  active: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default SuiPagination
