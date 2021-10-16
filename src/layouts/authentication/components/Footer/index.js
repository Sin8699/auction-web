import Grid from '@material-ui/core/Grid'

// @material-ui icons
import GitHubIcon from '@material-ui/icons/GitHub'
import MaterialUi from 'component-pages/Icons/MaterialUiIcon'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

function Footer() {
  return (
    <SuiBox component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <SuiBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
            <SuiBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SuiTypography
                component="a"
                // href="https://github.com/hyperion0201/live-auction-service"
                variant="body2"
                textColor="secondary"
              >
                Back End
              </SuiTypography>
            </SuiBox>

            <SuiTypography
              component="a"
              // href="https://github.com/Sin8699/auction-web"
              variant="body2"
              textColor="secondary"
            >
              Front end
            </SuiTypography>
          </SuiBox>
        </Grid>
        <Grid item xs={12} lg={8}>
          <SuiBox display="flex" justifyContent="center" mt={1} mb={3}>
            <SuiBox mr={3} color="secondary">
              <GitHubIcon fontSize="small" />
            </SuiBox>
            <SuiBox color="secondary">
              <MaterialUi size="1.25rem" />
            </SuiBox>
          </SuiBox>
        </Grid>
        <Grid item xs={12} lg={8} className="text-center">
          <SuiTypography variant="body2" textColor="secondary">
            Copyright &copy; 2021 Soft by 4 anh em siêu nhân.
          </SuiTypography>
        </Grid>
      </Grid>
    </SuiBox>
  )
}

export default Footer
