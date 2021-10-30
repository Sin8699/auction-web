import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'
import Link from '@material-ui/core/Link'

import SuiButton from 'components/SuiButton'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import styles from 'component-pages/Sidenav/styles/sidenavCard'

import {useSoftUIController} from 'context'

function SidenavCard() {
  const [controller] = useSoftUIController()
  const {miniSidenav, sidenavColor} = controller
  const classes = styles({miniSidenav, sidenavColor})

  return (
    <Card className={classes.card}>
      <CardContent className={classes.card_content}>
        <SuiBox customClass={classes.card_iconBox}>
          <Icon className={`material-icons-round ${classes.card_icon}`} fontSize="medium">
            star
          </Icon>
        </SuiBox>
        <SuiBox>
          <SuiTypography variant="h6" textColor="white">
            Need help?
          </SuiTypography>
          <SuiBox mb={1.5} mt={-1}>
            <SuiTypography variant="caption" textColor="white" fontWeight="medium">
              Please check our docs
            </SuiTypography>
          </SuiBox>
          <SuiButton
            component={Link}
            href="https://www.creative-tim.com/learning-lab/material-ui/quick-start/soft-ui-dashboard"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="default"
            fullWidth
          >
            documentation
          </SuiButton>
        </SuiBox>
      </CardContent>
    </Card>
  )
}

export default SidenavCard
