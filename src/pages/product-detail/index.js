import Card from '@material-ui/core/Card'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'

// Soft UI Dashboard Material-UI example components
import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'
import SuiTypography from 'components/SuiTypography'
import RelatedProductsTable from './components/RelatedProductsTable'
import Grid from '@material-ui/core/Grid'
import { useState } from 'react'
import { getButtonByStatus } from '../../helpers/getButtonByStatus'
import dayjs from 'dayjs'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const product_fake = {
  createdAt: '2021-10-18T11:49:25.180Z',
  name: 'Macbook pro',
  primaryImage:
    'https://cdn.tgdd.vn/Products/Images/44/236131/apple-macbook-pro-m1-2020-z11c000cj-600x600.jpg',
  extraImages: [
    'https://www.apple.com/v/macbook-pro-14-and-16/a/images/overview/camera/six_speaker__f8agb5mmn9qy_large.jpg',
    'https://www.apple.com/v/macbook-pro-14-and-16/a/images/overview/ports/magsafe__wkeiwwe9e36i_large.jpg',
    'https://www.apple.com/v/macbook-pro-14-and-16/a/images/overview/camera/spatial_audio__dipr8iji32uu_small.jpg'
  ],
  description: 'description 1',
  categories: [],
  _id: '1'
}

const bidding_product_fake = {
  createdAt: '2021-10-18T10:18:50.343Z',
  status: 'AVAILABLE',
  stepPrice: 'stepPrice 1',
  initPrice: 'initPrice 1',
  buyNowPrice: '200',
  currentPrice: '100',
  publicTime: 'publicTime 1',
  endTime: 'endTime 1',
  winner: 'winner 1',
  product: '1',
  _id: '3'
}

const seller_fake = {
  fullName: 'Antonio Kovacek',
  rate: '10'
}

const bidder_fake = {
  fullName: 'Julio Murphy',
  rate: '10'
}

function ProductDetail() {
  const [currentImagePreview, setCurrentImagePreview] = useState(
    'https://cdn.tgdd.vn/Products/Images/44/236131/apple-macbook-pro-m1-2020-z11c000cj-600x600.jpg'
  )

  const product = product_fake
  const bidding_product = bidding_product_fake
  const seller = seller_fake
  const bidder = bidder_fake

  const handleChangePreview = (url) => () => {
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
          </SuiBox>
          <SuiBox display="flex" justifyContent="space-between" pt={2} px={2}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Grid item>
                  <img src={currentImagePreview} alt="" width="600px" height="400px" />
                </Grid>
                <Grid container item>
                  {[product.primaryImage, ...product.extraImages].map((img) => {
                    return (
                      <Grid item xs={3} onClick={handleChangePreview(img)}>
                        <img src={img} width="120px" height="80px" alt="" />
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <h1>{product.name}</h1>
                <SuiTypography
                  variant="button"
                  fontWeight="regular"
                  textTransform="capitalize"
                  textGradient
                >
                  Price: {bidding_product.currentPrice} $
                </SuiTypography>

                <SuiBox my={2}>
                  <SuiTypography textGradient variant="h5" textColor="info">
                    Price Buy Now: {bidding_product.buyNowPrice} $
                  </SuiTypography>
                </SuiBox>

                {getButtonByStatus(bidding_product.status)}

                <SuiBox my={2} display="flex">
                  <SuiTypography
                    style={{ lineHeight: '30px', marginRight: '20px' }}
                    mt={2}
                    variant="h6"
                    color="info"
                  >
                    Seller: {seller.fullName}
                  </SuiTypography>
                  <h2>
                    <span
                      class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-6m0tds"
                      aria-hidden="true"
                    >
                      star
                    </span>
                    <span
                      class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-6m0tds"
                      aria-hidden="true"
                    >
                      star
                    </span>
                    <span
                      class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-6m0tds"
                      aria-hidden="true"
                    >
                      star
                    </span>
                    <span
                      class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-6m0tds"
                      aria-hidden="true"
                    >
                      star
                    </span>
                    <span
                      class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-6m0tds"
                      aria-hidden="true"
                    >
                      star_half
                    </span>
                  </h2>
                </SuiBox>

                <SuiBox my={2} display="flex">
                  <SuiTypography
                    style={{ lineHeight: '30px', marginRight: '20px' }}
                    mt={2}
                    variant="h6"
                    color="info"
                  >
                    Highest bidder: {bidder.fullName}
                  </SuiTypography>
                  <h2>
                    <span
                      class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-6m0tds"
                      aria-hidden="true"
                    >
                      star
                    </span>
                    <span
                      class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-6m0tds"
                      aria-hidden="true"
                    >
                      star
                    </span>
                    <span
                      class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-6m0tds"
                      aria-hidden="true"
                    >
                      star
                    </span>
                    <span
                      class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-6m0tds"
                      aria-hidden="true"
                    >
                      star
                    </span>
                    <span
                      class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-6m0tds"
                      aria-hidden="true"
                    >
                      star_half
                    </span>
                  </h2>
                </SuiBox>

                <SuiTypography
                  variant="button"
                  fontWeight="regular"
                  textTransform="capitalize"
                  textColor={'error'}
                  customClass="line-height-0"
                >
                  {dayjs(product.createdAt).fromNow()}
                </SuiTypography>
              </Grid>
            </Grid>
          </SuiBox>

          <SuiBox textColor="danger" mt={5} pt={2} px={2}>
            <SuiTypography variant="h6">Description: </SuiTypography>
            <SuiTypography fontWeight="regular" textTransform="capitalize">
              {product.description}
            </SuiTypography>
          </SuiBox>

          <SuiBox
            mt={5}
            textColor="danger"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={2}
            px={2}
          >
            <SuiTypography variant="h6">Related Products</SuiTypography>
          </SuiBox>
          <RelatedProductsTable />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default ProductDetail
