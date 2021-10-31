import {useEffect} from 'react'

import {useDispatch} from 'react-redux'

import SuiBox from 'components/SuiBox'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'
import TrendingProductTableData from './components/TrendingProductTableData/index'

import {requestExampleData} from 'redux/actions/example'
import {requestProfile} from 'redux/actions/user'

function Dashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestExampleData())
    dispatch(requestProfile())
  }, [dispatch])
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
