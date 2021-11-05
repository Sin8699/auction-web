import {Link} from 'react-router-dom'

import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import SuiButton from 'components/SuiButton'

import styles from './styles'

function ProductCard({name, subCategory, image, url}) {
  const classes = styles({})

  return (
    <Card className={classes.projectCard}>
      <SuiBox customClass={classes.projectCard_imageContainer}>
        <CardMedia
          src={image}
          component="img"
          className={classes.projectCard_image}
          style={{minHeight: '200px'}}
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
            {subCategory}
          </SuiTypography>
        </SuiBox>

        <SuiBox display="flex" justifyContent="space-between" alignItems="center">
          {name}
        </SuiBox>
      </SuiBox>
      <SuiBox py={1} px={0.5} component={Link} to="google.com">
        <SuiButton fullWidth variant="contained" buttonColor="info">
          Edit
        </SuiButton>
      </SuiBox>
    </Card>
  )
}

ProductCard.defaultProps = {
  product: {name: '', subCategory: '', image: '', url: ''}
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default ProductCard
