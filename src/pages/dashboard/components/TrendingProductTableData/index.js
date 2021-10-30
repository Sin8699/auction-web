import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

// Billing page components
import Transaction from 'layouts/billing/components/Transaction'

function TrendingProductTableData() {
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
        <SuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          customClass="no-list-style"
        >
          <Transaction
            color="error"
            icon="arrow_downward"
            name="Netflix"
            description="27 March 2020, at 12:30 PM"
            value="- $ 2,500"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="Apple"
            description="27 March 2020, at 04:30 AM"
            value="+ $ 2,000"
          />
        </SuiBox>
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
        <SuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          customClass="no-list-style"
        >
          <Transaction
            color="success"
            icon="arrow_upward"
            name="Stripe"
            description="26 March 2020, at 13:45 PM"
            value="+ $ 750"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="HubSpot"
            description="26 March 2020, at 12:30 PM"
            value="+ $ 1,000"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="Creative Tim"
            description="26 March 2020, at 08:30 AM"
            value="+ $ 2,500"
          />
          <Transaction
            color="dark"
            icon="priority_high"
            name="Webflow"
            description="26 March 2020, at 05:00 AM"
            value="Pending"
          />
        </SuiBox>
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
        <SuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          customClass="no-list-style"
        >
          <Transaction
            color="success"
            icon="arrow_upward"
            name="Stripe"
            description="26 March 2020, at 13:45 PM"
            value="+ $ 750"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="HubSpot"
            description="26 March 2020, at 12:30 PM"
            value="+ $ 1,000"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="Creative Tim"
            description="26 March 2020, at 08:30 AM"
            value="+ $ 2,500"
          />
        </SuiBox>
      </SuiBox>
    </Card>
  )
}

export default TrendingProductTableData
