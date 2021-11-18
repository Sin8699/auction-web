import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import cn from 'clsx'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Countdown from 'react-countdown'
import {Card, CardMedia, Tooltip} from '@material-ui/core'
import Heart from 'component-pages/Icons/Heart'
import SuiBox from 'components/SuiBox'
import SuiAvatar from 'components/SuiAvatar'
import SuiButton from 'components/SuiButton'
import SuiTypography from 'components/SuiTypography'
import NoAvatar from 'assets/images/no-avatar.png'
import NoImage from 'assets/images/no-image.png'
import {handleFavoredProduct, isFavoredProduct} from 'helpers/favoredProduct'
import BiddingHistoryModal from './BiddingHistoryModal'
import {ROUTER_DEFAULT} from 'constants/router'
import styles from './styles'
import {hide} from 'helpers/string'
import BiddingProductApi from 'apis/bidding-product/apiObject'
import {openAlert} from 'redux/actions/alert'

const timeIsNew = 120000

function ProductCard({
  idProduct,
  biddingProductId,
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
  const dispatch = useDispatch()

  const {profile} = useSelector(state => state.userState)

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

  const handleResult = (data, status, error) => {
    if (error) dispatch(openAlert({messageAlert: error, typeAlert: 'error'}))
    if (status === 200)
      dispatch(openAlert({messageAlert: data.message || 'success', typeAlert: 'success'}))
    if (status && status !== 200)
      dispatch(openAlert({messageAlert: data.message || 'Something wrong', typeAlert: 'error'}))
  }

  const handleAdminDelete = async () => {
    const {data, status, error} = await BiddingProductApi.updateDocument(biddingProductId, {
      status: 'EXPIRED'
    })
    handleResult(data, status, error)
  }

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

        <SuiBox mb={1}>
          Highest bidder:{' '}
          {get(winner, 'fullName', '')
            ? winner?._id === profile._id
              ? 'You'
              : hide(winner?.fullName || '')
            : 'Not bid'}
        </SuiBox>

        <SuiBox display="flex" justifyContent="space-between" alignItems="center">
          {profile.role !== 'ADMIN' && buttonBid}
          {profile.role === 'ADMIN' && (
            <SuiButton variant="outlined" buttonColor="error" onClick={handleAdminDelete}>
              Delete
            </SuiButton>
          )}
          <SuiTypography variant="h5" textTransform="capitalize">
            <Countdown date={new Date(endTime)}>
              <div className={classes.projectCard_stock}>
                <img className={classes.stock_img} src={'/images/sold-out.png'} alt="" />
              </div>
            </Countdown>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      {buyNow?.allowBuyNow && profile.role !== 'ADMIN' && (
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
