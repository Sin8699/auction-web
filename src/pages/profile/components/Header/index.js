import {useState, useEffect} from 'react'

import {Card, Tab, Tabs, AppBar} from '@material-ui/core'

import SuiBox from 'components/SuiBox'
import SuiAvatar from 'components/SuiAvatar'

import DashboardNavbar from 'component-pages/Header'
import Cube from 'component-pages/Icons/Cube'
import Settings from 'component-pages/Icons/Settings'

import breakpoints from 'assets/theme/base/breakpoints'
import avatar from 'assets/images/curved-images/curved-6.jpg'

import styles from './styles'
import Flex from 'assets/styled/FlexLayout'

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
        <Flex wraper center>
          <SuiAvatar
            src={avatar}
            alt="profile-image"
            variant="rounded"
            size="xl"
            customClass="shadow-sm"
          />

          <div className="ml-auto" style={{width: 300}}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                className="bg-transparent"
              >
                <Tab label="Profile" icon={<Cube />} />
                <Tab label="Password" icon={<Settings />} />
              </Tabs>
            </AppBar>
          </div>
        </Flex>
      </Card>
    </SuiBox>
  )
}

export default Header
