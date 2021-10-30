import {Card, Grid, Icon, Tooltip} from '@material-ui/core'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiButton from 'components/SuiButton'

import borders from 'assets/theme/base/borders'

import masterCardLogo from 'assets/images/logos/mastercard.png'
import visaLogo from 'assets/images/logos/visa.png'

function PaymentMethod() {
  const {borderWidth, borderColor} = borders

  return (
    <Card id="delete-account">
      <SuiBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SuiTypography variant="h6" fontWeight="medium">
          Payment Method
        </SuiTypography>
        <SuiButton variant="gradient" buttonColor="dark">
          <Icon className="material-icons-round font-bold">add</Icon>
          &nbsp;add new card
        </SuiButton>
      </SuiBox>
      <SuiBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SuiBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SuiBox component="img" src={masterCardLogo} alt="master card" width="10%" mr={2} />
              <SuiTypography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
              </SuiTypography>
              <SuiBox ml="auto" lineHeight={0}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon className="material-icons-round cursor-pointer" fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </SuiBox>
            </SuiBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <SuiBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SuiBox component="img" src={visaLogo} alt="master card" width="10%" mr={2} />
              <SuiTypography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;5248
              </SuiTypography>
              <SuiBox ml="auto" lineHeight={0}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon className="material-icons-round cursor-pointer" fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </SuiBox>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
    </Card>
  )
}

export default PaymentMethod
