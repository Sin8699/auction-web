import Card from '@material-ui/core/Card'
import Icon from '@material-ui/core/Icon'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

// Custom styles for the WorkWithTheRockets
import styles from './styles'

function WorkWithTheRockets() {
  const classes = styles()

  return (
    <Card className="h-100">
      <SuiBox position="relative" height="100%" p={2}>
        <SuiBox customClass={classes.workWithTheRockets_content}>
          <SuiBox mb={3} pt={1}>
            <SuiTypography variant="h5" textColor="white" fontWeight="bold">
              Work with the rockets
            </SuiTypography>
          </SuiBox>
          <SuiBox mb={2}>
            <SuiTypography variant="body2" textColor="white">
              Wealth creation is an evolutionarily recent positive-sum game. It is all about who
              take the opportunity first.
            </SuiTypography>
          </SuiBox>
          <SuiTypography
            component="a"
            href="#"
            variant="button"
            textColor="white"
            fontWeight="medium"
            customClass={classes.workWithTheRockets_button}
          >
            Read More
            <Icon className="material-icons-round font-bold">arrow_forward</Icon>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </Card>
  )
}

export default WorkWithTheRockets
