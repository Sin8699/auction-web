/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import {Card, Grid} from '@material-ui/core'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import {ImageLayout} from 'assets/styled/ImageLayout'

import RelatedProductsTable from './components/RelatedProductsTable'

import {getButtonByStatus} from '../../helpers/getButtonByStatus'

import BidModal from '../bidding/components/BidModal/index'

import {requestProduct} from 'redux/actions/product'

import NoImage from 'assets/images/no-image.png'

function ProductDetail() {
  const dispatch = useDispatch()
  const {id} = useParams()

  const {product} = useSelector(state => state.productState)

  const [currentImagePreview, setCurrentImagePreview] = useState(NoImage)

  useEffect(() => {
    dispatch(requestProduct(id))
  }, [id])

  useEffect(() => {
    setCurrentImagePreview(product.imageUrl)
  }, [product])

  const handleChangePreview = url => () => {
    setCurrentImagePreview(url)
  }

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mb={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" pt={2} px={2}>
            <SuiTypography variant="h6" fontWeight="medium">
              Products
            </SuiTypography>
            <BidModal
              biddingProduct={product['_id']}
              productName={product.name}
              buttonColor="error"
              variant="gradient"
            />
          </SuiBox>
          <SuiBox display="flex" justifyContent="space-between" pt={2} px={2}>
            <Grid container alignItems="center">
              <Grid item lg={6} md={6} sm={12}>
                <div>
                  <ImageLayout src={`http://${currentImagePreview}`} alt="" />
                </div>
                <Grid container>
                  {(product.name ? [product.imageUrl, ...product.extraImages] : []).map(img => {
                    return (
                      <Grid item xs={3} onClick={handleChangePreview(img)}>
                        <ImageLayout src={`http://${img}`} alt="" />
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>

              <Grid item lg={6} md={6} sm={12}>
                <SuiBox ml={4}>
                  <h1>{product.name}</h1>
                  <SuiTypography
                    variant="button"
                    fontWeight="regular"
                    textTransform="capitalize"
                    textGradient
                  >
                    Price: {product.currentPrice} $
                  </SuiTypography>

                  <SuiBox my={2}>
                    <SuiTypography textGradient variant="h5" textColor="info">
                      Price Buy Now: {product.buyNowPrice} $
                    </SuiTypography>
                  </SuiBox>

                  {getButtonByStatus(product.status)}
                </SuiBox>
              </Grid>
            </Grid>
          </SuiBox>

          <SuiBox textColor="danger" mt={5} pt={2} px={2}>
            <SuiTypography variant="h6">Description: </SuiTypography>
            <SuiTypography fontWeight="regular" textTransform="capitalize">
              {product.description}
            </SuiTypography>
          </SuiBox>

          <SuiBox mt={5}>
            <SuiTypography variant="h6">Related Products</SuiTypography>
          </SuiBox>

          <SuiBox display="flex"></SuiBox>
          {/* <RelatedProductsTable /> */}
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default ProductDetail
