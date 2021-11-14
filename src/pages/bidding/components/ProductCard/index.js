import {useState, useEffect} from 'react'
import cn from 'clsx'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Countdown from 'react-countdown'
import {Card, CardMedia, Tooltip} from '@material-ui/core'
import Heart from 'component-pages/Icons/Heart'
import SuiBox from 'components/SuiBox'
import SuiAvatar from 'components/SuiAvatar'
import SuiTypography from 'components/SuiTypography'
import NoAvatar from 'assets/images/no-avatar.png'
import NoImage from 'assets/images/no-image.png'
import {handleFavoredProduct, isFavoredProduct} from 'helpers/favoredProduct'
import BiddingHistoryModal from './BiddingHistoryModal'
import {ROUTER_DEFAULT} from 'constants/router'
import styles from './styles'

const timeIsNew = 120000

function ProductCard({
  idProduct,
  category,
  subCategory,
  nameProduct,
  imageUrl,
  buttonBid,
  buttonBuyNow,
  authors,
  publicTime,
  endTime,
  winner,
  buyNow
}) {
  const classes = styles({})
  const isFavored = isFavoredProduct(idProduct)

  const [isFavoredState, setIsFavoredState] = useState(isFavored)
  const [isNewProduct, setIsNewProduct] = useState(new Date(publicTime) - new Date() > -timeIsNew)

  const handleFavored = () => {
    setIsFavoredState(prev => !prev)
    handleFavoredProduct(`${idProduct}`)
  }

  useEffect(() => {
    let myInterval =
      isNewProduct &&
      setInterval(() => {
        setIsNewProduct(new Date(publicTime) - new Date() > -timeIsNew)
      }, 10000)
    return () => clearInterval(myInterval)
  })

  const renderAuthors = authors.map(({image: media, name}) => (
    <Tooltip key={name} title={name} placement="bottom">
      <SuiAvatar
        src={media || NoAvatar}
        alt={name}
        size="xs"
        customClass={classes.projectCard_avatar}
      />
    </Tooltip>
  ))

  return (
    <Card className={classes.projectCard}>
      {isNewProduct && (
        <div className={classes.projectCard_new}>
          <img
            className={classes.projectCard_new_img}
            src={'/images/new-products-label.png'}
            alt=""
          />
        </div>
      )}

      <SuiBox customClass={classes.projectCard_imageContainer}>
        <CardMedia
          src={`http://${imageUrl}` || NoImage}
          component="img"
          title={nameProduct}
          className={classes.projectCard_image}
          style={{height: '235px'}}
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
            {category + ', ' + subCategory}
          </SuiTypography>
          <BiddingHistoryModal id={idProduct} />
        </SuiBox>
        <SuiBox mb={1}>
          <SuiTypography
            component={Link}
            to={`${ROUTER_DEFAULT.PRODUCT_DETAIL}/${idProduct}`}
            variant="h5"
            textTransform="capitalize"
          >
            {nameProduct}
          </SuiTypography>
        </SuiBox>
        <SuiBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <div
            className={cn(classes.icon_love, isFavoredState && classes.icon_love_active)}
            onClick={handleFavored}
          >
            <Heart />
          </div>
          {renderAuthors}
        </SuiBox>

        <SuiBox mb={1}>Highest bidder: {winner?.fullName || 'Not bid'}</SuiBox>

        <SuiBox display="flex" justifyContent="space-between" alignItems="center">
          {buttonBid}
          <SuiTypography variant="h5" textTransform="capitalize">
            <Countdown date={new Date(endTime)}>
              <div className={classes.projectCard_stock}>
                <img className={classes.stock_img} src={'/images/sold-out.png'} alt="" />
              </div>
            </Countdown>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      {buyNow?.allowBuyNow && (
        <SuiBox py={1} px={0.5}>
          {buttonBuyNow}
        </SuiBox>
      )}
    </Card>
  )
}

ProductCard.defaultProps = {
  authors: []
}

ProductCard.propTypes = {
  idProduct: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  nameProduct: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  buttonBid: PropTypes.element.isRequired,
  buttonBuyNow: PropTypes.element.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
  publicTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired
}

export default ProductCard
