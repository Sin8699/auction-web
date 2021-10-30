import SuiBox from 'components/SuiBox'

// Soft UI Dashboard Material-UI example components
import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'
import TrendingProductTableData from './components/TrendingProductTableData/index'

function Dashboard() {
  return (
    <DashboardLayout>
      <SuiBox mb={3}>
        <Header />
        <TrendingProductTableData />
        <Footer />
      </SuiBox>
    </DashboardLayout>
  )
}

export default Dashboard
