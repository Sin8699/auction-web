import {useState, useEffect} from 'react'

import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiAvatar from 'components/SuiAvatar'

import DashboardNavbar from 'component-pages/Header'

import Cube from 'component-pages/Icons/Cube'
import Settings from 'component-pages/Icons/Settings'

import breakpoints from 'assets/theme/base/breakpoints'

import styles from './styles'

// Images
import burceMars from 'assets/images/bruce-mars.jpg'

function Header({handleSetTabValue, tabValue}) {
  const [tabsOrientation, setTabsOrientation] = useState('horizontal')
  const classes = styles()

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation('vertical')
        : setTabsOrientation('horizontal')
    }

    // The event listener that's calling the handleTabsOrientation function when resizing the window.
    window.addEventListener('resize', handleTabsOrientation)

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation()

    return () => window.removeEventListener('resize', handleTabsOrientation)
  }, [tabsOrientation])

  return (
    <SuiBox position="relative">
      <DashboardNavbar absolute light />
      <SuiBox customClass={classes.profileHeader_background} />
      <Card className={classes.profileHeader_profile}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SuiAvatar
              src={burceMars}
              alt="profile-image"
              variant="rounded"
              size="xl"
              customClass="shadow-sm"
            />
          </Grid>
          <Grid item>
            <SuiBox height="100%" mt={0.5}>
              <SuiTypography variant="h5" fontWeight="medium">
                Alex Thompson
              </SuiTypography>
              <SuiTypography variant="button" textColor="text" fontWeight="medium">
                CEO / Co-Founder
              </SuiTypography>
            </SuiBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} className="ml-auto">
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                className="bg-transparent"
              >
                <Tab label="Profile" icon={<Cube />} />
                <Tab label="Edit password" icon={<Settings />} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </SuiBox>
  )
}

export default Header
