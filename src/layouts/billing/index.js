import Grid from '@material-ui/core/Grid'

import SuiBox from 'components/SuiBox'

import MasterCard from 'component-pages/Cards/MasterCard'
import DefaultInfoCard from 'component-pages/Cards/InfoCards/DefaultInfoCard'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'component-pages/Navbars/DashboardNavbar'

import PaymentMethod from 'layouts/billing/components/PaymentMethod'
import Invoices from 'layouts/billing/components/Invoices'
import BillingInformation from 'layouts/billing/components/BillingInformation'
import Transactions from 'layouts/billing/components/Transactions'

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={4}>
        <SuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="paypal"
                    description="Freelance Payment"
                    value="$455.00"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  )
}

export default Billing
