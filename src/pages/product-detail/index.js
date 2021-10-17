import Card from '@material-ui/core/Card'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'

// Soft UI Dashboard Material-UI example components
import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

function ProductDetail() {
  return (
    <DashboardLayout>
      <SuiBox mb={3}>
        <Header />
        <Card>ProductDetail</Card>
        <Footer />
      </SuiBox>
    </DashboardLayout>
  )
}

export default ProductDetail