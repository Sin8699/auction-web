import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

// Billing page components
import Transaction from 'layouts/billing/components/Transaction'
import { useAxios } from '../../../../apis/useAxiosConfig'
import { BASE_URL } from '../../../../constants/index'
import dayjs from 'dayjs'

function TrendingProductTableData() {
  const [{ data, loading }] = useAxios(`${BASE_URL}/bidding-product/trending`)

  if (loading)
    return (
      <SuiBox display="flex" justifyContent="center">
        <CircularProgress />
      </SuiBox>
    )

  const renderRecord = (item) => {
    const status =
      item.status === 'EXPIRED' ? 'error' : item.status === 'AVAILABLE' ? 'success' : 'dark'

    const icon =
      item.status === 'EXPIRED'
        ? 'arrow_downward'
        : item.status === 'AVAILABLE'
        ? 'arrow_upward'
        : 'priority_high'

    return (
      <SuiBox
        component="ul"
        display="flex"
        flexDirection="column"
        p={0}
        m={0}
        customClass="no-list-style"
      >
        <Transaction
          color={status}
          icon={icon}
          name={item.product.name}
          description={dayjs(item.endTime).format('DD/MM/YYYY hh:mm:ss')}
          value={item.currentPrice}
        />
      </SuiBox>
    )
  }

  const { trendingTimeEnd = [], trendingPrice = [], topBidding = [] } = data

  return (
    <Card className="h-100">
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Products
        </SuiTypography>
      </SuiBox>
      <SuiBox pt={3} pb={2} px={2}>
        <SuiBox mb={2} display="flex" justifyContent="center">
          <SuiTypography
            variant="caption"
            textColor="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Products near the end of the auction
          </SuiTypography>
        </SuiBox>
        {trendingTimeEnd.map(renderRecord)}

        <Divider />
        <SuiBox mt={1} mb={2} display="flex" justifyContent="center">
          <SuiTypography
            variant="caption"
            textColor="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Products with many auctions
          </SuiTypography>
        </SuiBox>
        {topBidding.map(renderRecord)}

        <Divider />
        <SuiBox mt={1} mb={2} display="flex" justifyContent="center">
          <SuiTypography
            variant="caption"
            textColor="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            The product with the highest price
          </SuiTypography>
        </SuiBox>

        {trendingPrice.map(renderRecord)}
      </SuiBox>
    </Card>
  )
}

export default TrendingProductTableData
