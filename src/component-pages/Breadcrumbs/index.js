import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Breadcrumbs as MuiBreadcrumbs } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import styles from 'component-pages/Breadcrumbs/styles'

function Breadcrumbs({ icon, title, route, light }) {
  const classes = styles({ light })
  const routes = route.slice(0, -1)

  return (
    <SuiBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs className={classes.breadcrumbs}>
        <Link to="/">
          <SuiTypography
            component="span"
            variant="body2"
            textColor={light ? 'white' : 'dark'}
            opacity={light ? 0.8 : 0.5}
            customClass="line-height-0"
          >
            <Icon className="material-icons-round">{icon}</Icon>
          </SuiTypography>
        </Link>
        {routes.map((el) => (
          <Link to={`/${el}`} key={el} className="decoration-none">
            <SuiTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              textColor={light ? 'white' : 'dark'}
              opacity={light ? 0.8 : 0.5}
              customClass="line-height-0"
            >
              {el}
            </SuiTypography>
          </Link>
        ))}
        <SuiTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          textColor={light ? 'white' : 'dark'}
          customClass="line-height-0"
        >
          {title.replace('-', ' ')}
        </SuiTypography>
      </MuiBreadcrumbs>
      <SuiTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        textColor={light ? 'white' : 'dark'}
        noWrap
      >
        {title.replace('-', ' ')}
      </SuiTypography>
    </SuiBox>
  )
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false
}

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool
}

export default Breadcrumbs
