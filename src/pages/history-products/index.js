import SuiBox from 'components/SuiBox'
import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'
import HistorySeller from './components/HistorySeller'
import HistoryBidder from './components/HistoryBidder'

import {loadFromStorage} from 'utils/storage'

function HistoryProducts() {
  const {role} = loadFromStorage('user') || ''
  return (
    <DashboardLayout>
      <SuiBox mb={3}>
        <Header />
        {role === 'SELLER' && <HistorySeller />}
        {role === 'BIDDER' && <HistoryBidder />}
        <Footer />
      </SuiBox>
    </DashboardLayout>
  )
}

export default HistoryProducts
