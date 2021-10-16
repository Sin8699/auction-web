import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import SuiBox from 'components/SuiBox'
import NavbarLink from 'layouts/authentication/components/Header/ViewDefault'

function NavbarMobile({ open, close }) {
  const { width } = open && open.getBoundingClientRect()

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      MenuListProps={{ style: { width: `calc(${width}px - 4rem)` } }}
    >
      <SuiBox px={0.5}>
        <NavbarLink icon="account_circle" name="sign up" route="/authentication/sign-up" />
        <NavbarLink icon="key" name="sign in" route="/authentication/sign-in" />
      </SuiBox>
    </Menu>
  )
}

// Typechecking props for the DefaultNavbarMenu
NavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired
}

export default NavbarMobile
