import {Link} from 'react-router-dom'

import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Icon from '@material-ui/core/Icon'
import MuiLink from '@material-ui/core/Link'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import styles from 'component-pages/Cards/BlogCards/TransparentBlogCard/styles'

function TransparentBlogCard({image, title, description, action}) {
  const classes = styles()

  return (
    <Card className={classes.card}>
      {action.type === 'internal' ? (
        <Link to={action.route}>
          <CardMedia src={image} component="img" title={title} className={classes.card_image} />
        </Link>
      ) : (
        <MuiLink href={action.route} target="_blank" rel="noreferrer">
          <CardMedia src={image} component="img" title={title} className={classes.card_image} />
        </MuiLink>
      )}
      <SuiBox py={3}>
        {action.type === 'internal' ? (
          <Link to={action.route} className={classes.card_action}>
            <SuiTypography variant="h5" gutterBottom>
              {title}
            </SuiTypography>
          </Link>
        ) : (
          <MuiLink
            href={action.route}
            target="_blank"
            rel="noreferrer"
            className={classes.card_action}
          >
            <SuiTypography variant="h5" gutterBottom>
              {title}
            </SuiTypography>
          </MuiLink>
        )}
        <SuiBox mb={2}>
          <SuiTypography variant="body2" component="p" textColor="text">
            {description}
          </SuiTypography>
        </SuiBox>
        {action.type === 'internal' ? (
          <Link to={action.route} className={classes.card_action}>
            <SuiTypography
              variant="body2"
              textColor={action.color}
              textTransform="capitalize"
              component="span"
            >
              {action.label}
              <Icon className="material-icons-round font-bold">arrow_forward</Icon>
            </SuiTypography>
          </Link>
        ) : (
          <MuiLink
            href={action.route}
            target="_blank"
            rel="noreferrer"
            className={classes.card_action}
          >
            <SuiTypography
              variant="body2"
              textColor={action.color}
              textTransform="capitalize"
              component="span"
            >
              {action.label}
              <Icon className="material-icons-round font-bold">arrow_forward</Icon>
            </SuiTypography>
          </MuiLink>
        )}
      </SuiBox>
    </Card>
  )
}

// Typechecking props for the TransparentBlogCard
TransparentBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(['external', 'internal']),
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      'inherit',
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'light',
      'dark',
      'text'
    ]).isRequired
  }).isRequired
}

export default TransparentBlogCard
