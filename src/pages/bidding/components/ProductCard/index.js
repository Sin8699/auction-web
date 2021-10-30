// react-router-dom components
import {Link} from 'react-router-dom'

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
import styles from './styles'
import Countdown from 'react-countdown'
import cn from 'clsx'
import {handleFavoredProduct, isFavoredProduct} from '../../../../helpers/favoredProduct'
import {useState} from 'react'
import BiddingHistoryModal from './BiddingHistoryModal'

function ProductCard({id, image, label, title, description, action, authors, info, countDown}) {
  const classes = styles({})
  const isFavored = isFavoredProduct(id)

  const [isFavoredState, setIsFavoredState] = useState(isFavored)

  const handleFavored = () => {
    setIsFavoredState(prev => !prev)
    handleFavoredProduct(`${id}`)
  }

  const renderAuthors = authors.map(({image: media, name}) => (
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
        <SuiBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <SuiTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            textGradient
          >
            {label}
          </SuiTypography>
          <BiddingHistoryModal id={id} />
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
        <SuiBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <div
            className={cn(classes.icon_love, isFavoredState && classes.icon_love_active)}
            onClick={handleFavored}
          >
            <svg className="heart" viewBox="0 0 32 29.6">
              <path
                d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
              />
            </svg>
          </div>
          {renderAuthors}
        </SuiBox>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center">
          {info}
          <SuiTypography variant="h5" textTransform="capitalize">
            <Countdown date={Date.now() + countDown}>
              <div className={classes.projectCard_stock}>
                <img className={classes.stock_img} src={'/images/sold-out.png'} alt="" />
              </div>
            </Countdown>
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
ProductCard.defaultProps = {
  authors: []
}

// Typechecking props for the DefaultProjectCard
ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
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
  countDown: PropTypes.number
}

export default ProductCard
