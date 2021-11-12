import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import {Card, CardMedia} from '@material-ui/core'

import SuiBox from 'components/SuiBox'

import SuiTypography from 'components/SuiTypography'

import NoImage from 'assets/images/no-image.png'

import {ROUTER_DEFAULT} from 'constants/router'

import styles from './styles'

function ProductCard({idProduct, category, subCategory, nameProduct, imageUrl}) {
  const classes = styles({})

  return (
    <Card className={classes.projectCard}>
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
      </SuiBox>
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
  imageUrl: PropTypes.string.isRequired
}

export default ProductCard
