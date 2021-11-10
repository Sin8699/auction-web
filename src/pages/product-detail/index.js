/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import dayjs from 'dayjs'

import {Card, Grid} from '@material-ui/core'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import {ImageLayout} from 'assets/styled/ImageLayout'
import NoImage from 'assets/images/no-image.png'

import {getButtonByStatus} from '../../helpers/getButtonByStatus'

import BidModal from '../bidding/components/BidModal'
import BasicTable from './components/TableBiddingRecord'

import {requestProduct, setProduct} from 'redux/actions/product'
import {requestBiddingProduct, setBiddingProduct} from 'redux/actions/bidding-product'
import {requestBiddingRecordsData} from 'redux/actions/bidding-record'

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

function ProductDetail() {
  const dispatch = useDispatch()
  const {id} = useParams()

  const {product} = useSelector(state => state.productState)
  const {biddingProduct, loadingBiddingProduct} = useSelector(state => state.biddingProductState)
  const {listBiddingRecord, loadingListBiddingRecord} = useSelector(
    state => state.biddingRecordState
  )

  const [currentImagePreview, setCurrentImagePreview] = useState(NoImage)

  useEffect(() => {
    dispatch(requestProduct(id))
    dispatch(requestBiddingProduct(id))
    dispatch(requestBiddingRecordsData(id))
    return () => {
      dispatch(setProduct({}))
      dispatch(setBiddingProduct({}))
    }
  }, [id])

  useEffect(() => {
    setCurrentImagePreview(product.imageUrl)
  }, [product])

  const handleChangePreview = url => () => setCurrentImagePreview(url)

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mb={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" pt={2} px={2}>
            <SuiTypography variant="h6" fontWeight="medium">
              Products
            </SuiTypography>
            <BidModal biddingProduct={id} productName={product.name} />
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
                      <Grid item xs={3} onClick={handleChangePreview(img)} key={img}>
                        <ImageLayout src={`http://${img}`} alt="" />
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>

              <Grid item lg={6} md={6} sm={12}>
                <SuiBox ml={4}>
                  <h1>{product.name}</h1>
                  <SuiBox>
                    <SuiTypography
                      variant="h5"
                      fontWeight="regular"
                      textTransform="capitalize"
                      textGradient
                    >
                      Price: {!loadingBiddingProduct ? biddingProduct.currentPrice : 'loading...'} $
                    </SuiTypography>
                  </SuiBox>

                  <SuiBox my={2}>
                    <SuiTypography
                      variant="h5"
                      fontWeight="regular"
                      textTransform="capitalize"
                      textGradient
                    >
                      {'Price step: '}
                      {!loadingBiddingProduct ? biddingProduct.stepPrice : 'loading...'} $
                    </SuiTypography>
                  </SuiBox>

                  <SuiBox my={2}>
                    <SuiTypography
                      variant="h5"
                      fontWeight="regular"
                      textTransform="capitalize"
                      textGradient
                    >
                      {'Price init: '}
                      {!loadingBiddingProduct ? biddingProduct.initPrice : 'loading...'} $
                    </SuiTypography>
                  </SuiBox>

                  {biddingProduct.allowBuyNow && (
                    <SuiBox my={2}>
                      <SuiTypography textGradient variant="h5" textColor="info">
                        Price Buy Now:
                        {!loadingBiddingProduct ? biddingProduct.buyNowPrice : 'loading...'} $
                      </SuiTypography>
                    </SuiBox>
                  )}

                  {getButtonByStatus(biddingProduct.status)}

                  <SuiBox my={2}>
                    <SuiTypography variant="h5" fontWeight="regular" textTransform="capitalize">
                      End time:
                      {!loadingBiddingProduct
                        ? ` ${dayjs(biddingProduct.endTime).fromNow()}`
                        : 'loading...'}
                    </SuiTypography>
                  </SuiBox>
                </SuiBox>
              </Grid>
            </Grid>
          </SuiBox>

          <SuiBox mt={5} pt={2} px={2}>
            <SuiTypography variant="h6">Description: </SuiTypography>
            <SuiTypography fontWeight="regular" textTransform="capitalize">
              {product.description || ''}
            </SuiTypography>
          </SuiBox>

          <SuiBox mt={5} pt={2} px={2}>
            <SuiTypography variant="h6">Bidding record: </SuiTypography>
            {loadingListBiddingRecord ? (
              'Loading...'
            ) : (
              <BasicTable value={listBiddingRecord.reverse()} />
            )}
          </SuiBox>

          <SuiBox mt={7} ml={2}>
            <SuiTypography variant="h6">Related Products</SuiTypography>
          </SuiBox>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default ProductDetail
