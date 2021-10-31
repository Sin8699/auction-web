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

function ProductDetail() {
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
                <img src="https://cdn.tgdd.vn/Products/Images/44/236131/apple-macbook-pro-m1-2020-z11c000cj-600x600.jpg"/>
              </Grid>

              <Grid item xs={6}>
                RIGHT
              </Grid>
            </Grid>
          </SuiBox>

          <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
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
