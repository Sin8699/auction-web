import PropTypes from 'prop-types'
import Collapse from '@material-ui/core/Collapse'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'

import SuiBox from 'components/SuiBox'

import styles from 'component-pages/Sidenav/styles/sidenavCollapse'

import { useSoftUIController } from 'context'

function SidenavCollapse({ icon, name, children, active, noCollapse, open, ...rest }) {
  const [controller] = useSoftUIController()
  const { miniSidenav, transparentSidenav, sidenavColor } = controller

  const classes = styles({
    active,
    noCollapse,
    open,
    miniSidenav,
    transparentSidenav,
    sidenavColor
  })

  return (
    <>
      <ListItem component="li">
        <SuiBox {...rest} customClass={classes.collapse_item}>
          <ListItemIcon className={classes.collapse_iconBox}>
            {typeof icon === 'string' ? (
              <Icon className={`material-icons-round ${classes.collapse_icon}`}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText primary={name} classes={{ root: classes.collapse_text }} />
        </SuiBox>
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  )
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = { active: false, noCollapse: false, children: false, open: false }

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool
}

export default SidenavCollapse
