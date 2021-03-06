import PropTypes from 'prop-types'

// @material-ui core components
import Menu from '@material-ui/core/Menu'
// import Grid from "@material-ui/core/Grid";

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'

// Soft UI Dashboard Material-UI example components
import DefaultNavbarLink from 'component-pages/Navbars/DefaultNavbar/DefaultNavbarLink'

function DefaultNavbarMobile({ open, close }) {
  const { width } = open && open.getBoundingClientRect()

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      MenuListProps={{ style: { width: `calc(${width}px - 4rem)` } }}
    >
      <SuiBox px={0.5}>
        <DefaultNavbarLink icon="donut_large" name="dashboard" route="/dashboard" />
        <DefaultNavbarLink icon="person" name="profile" route="/profile" />
        <DefaultNavbarLink icon="account_circle" name="sign up" route="/authentication/sign-up" />
        <DefaultNavbarLink icon="key" name="sign in" route="/authentication/sign-in" />
      </SuiBox>
    </Menu>
  )
}

// Typechecking props for the DefaultNavbarMenu
DefaultNavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired
}

export default DefaultNavbarMobile
