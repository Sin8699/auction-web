import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import SuiBox from 'components/SuiBox'
import styles from 'component-pages/LayoutContainers/DashboardLayout/styles'
import {useSoftUIController} from 'context'
import {requestProfile} from 'redux/actions/user'

function LayoutContainer({children}) {
  const dispatchRedux = useDispatch()

  const [controller, dispatch] = useSoftUIController()
  const {miniSidenav, direction} = controller
  const {pathname} = useLocation()
  const classes = styles({miniSidenav, direction})

  useEffect(() => {
    dispatch({type: 'LAYOUT', value: 'dashboard'})
  }, [dispatch, pathname])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatchRedux(requestProfile()), [])

  return <SuiBox customClass={classes.layoutContainer}>{children}</SuiBox>
}

// Typechecking props for the LayoutContainer
LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default LayoutContainer
