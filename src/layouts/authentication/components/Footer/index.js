import Grid from '@material-ui/core/Grid'

// @material-ui icons
import GitHubIcon from '@material-ui/icons/GitHub'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

function Footer() {
  return (
    <SuiBox component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8} className="text-center">
          <GitHubIcon fontSize="small" />
          <SuiTypography variant="body2" textColor="secondary">
            Copyright &copy; 2021 Soft by Nhóm 31_61_69_87
          </SuiTypography>
        </Grid>
      </Grid>
    </SuiBox>
  )
}

export default Footer
