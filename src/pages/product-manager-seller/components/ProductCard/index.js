import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import {Card, CardMedia} from '@material-ui/core'
import SuiButton from 'components/SuiButton'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import {ROUTER_DEFAULT} from 'constants/router'
import styles from './styles'
import NoImage from 'assets/images/no-image.png'
import get from 'lodash/get'

function ProductCard({_id, name, category, subCategory, image}) {
  const classes = styles({})
  const {listBiddingProductsHasSold} = useSelector(state => state.biddingProductState)
  const {listBiddingProducts} = useSelector(state => state.biddingProductState)

  const filterProductHasSold = () => {
    return listBiddingProductsHasSold.filter(product => {
      return get(product, 'product._id', '') === _id
    })
  }

  const filterProductHasBid = () => {
    return listBiddingProducts.filter(product => {
      return get(product, 'product._id', '') === _id
    })
  }

  const isSold = filterProductHasSold().length !== 0
  const isBidding = filterProductHasBid().length !== 0

  return (
    <Card className={classes.projectCard}>
      <SuiBox customClass={classes.projectCard_imageContainer}>
        <CardMedia
          src={`${image}` || NoImage}
          component="img"
          className={classes.projectCard_image}
          style={{height: '300px'}}
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
            {`${category}. ${subCategory}`}
          </SuiTypography>
        </SuiBox>

        <SuiBox display="flex" justifyContent="space-between" alignItems="center">
          {name}
        </SuiBox>
      </SuiBox>

      <SuiBox display="flex" justifyContent="flex-end" alignItems="center">
        {!isSold && !isBidding && (
          <SuiBox component={Link} to={`${ROUTER_DEFAULT.PRODUCT_MANAGER_SELLER_EDIT}/${_id}`}>
            <SuiButton variant="contained" buttonColor="info">
              Edit
            </SuiButton>
          </SuiBox>
        )}

        {(isSold || isBidding) && (
          <SuiButton variant="contained" buttonColor="info" disabled>
            {isSold ? 'SOLD' : isBidding ? 'Bidding' : 'EXPIRED'}
          </SuiButton>
        )}

        <SuiBox component={Link} to={`${ROUTER_DEFAULT.PRODUCT_DETAIL}/${_id}`} ml={1}>
          <SuiButton variant="gradient" buttonColor="warning">
            Detail
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </Card>
  )
}

ProductCard.defaultProps = {
  product: {_id: '', name: '', category: '', subCategory: '', image: '', url: ''}
}

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default ProductCard
