// react-router-dom components
import { Link } from 'react-router-dom'

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types'

// @material-ui core components
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Tooltip from '@material-ui/core/Tooltip'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiAvatar from 'components/SuiAvatar'

// Custom styles for the DefaultProjectCard
import styles from 'component-pages/Cards/ProjectCards/DefaultProjectCard/styles'

function DefaultProjectCard({
  image,
  label,
  title,
  description,
  action,
  authors,
  info,
  countDown
}) {
  const classes = styles()

  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <SuiAvatar src={media} alt={name} size="xs" customClass={classes.projectCard_avatar} />
    </Tooltip>
  ))

  return (
    <Card className={classes.projectCard}>
      <SuiBox customClass={classes.projectCard_imageContainer}>
        <CardMedia
          src={image}
          component="img"
          title={title}
          className={classes.projectCard_image}
          style={{
            minHeight: '235px'
          }}
        />
      </SuiBox>
      <SuiBox pt={3} px={0.5}>
        <SuiBox mb={1}>
          <SuiTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            textGradient
          >
            {label}
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={1}>
          {action.type === 'comp' ? (
            <SuiTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </SuiTypography>
          ) : (
            <SuiTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </SuiTypography>
          )}
        </SuiBox>
        <SuiBox mb={3} lineHeight={0}>
          <SuiTypography variant="button" fontWeight="regular" textColor="text">
            {description}
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
          {renderAuthors}
        </SuiBox>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center">
          {info}
          <SuiTypography variant="h5" textTransform="capitalize">
            {countDown}
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      <SuiBox py={1} px={0.5}>
        {action.comp}
      </SuiBox>
    </Card>
  )
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: []
}

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(['external', 'internal', 'comp']),
    route: PropTypes.string,
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'light',
      'dark',
      'white'
    ]).isRequired,
    label: PropTypes.string,
    comp: PropTypes.element
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
  info: PropTypes.element,
  countDown: PropTypes.string
}

export default DefaultProjectCard
