// @material-ui core components
import Grid from '@material-ui/core/Grid'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'

// Soft UI Dashboard Material-UI example components
import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Footer from 'component-pages/Footer'
import ProfileInfoCard from 'component-pages/Cards/InfoCards/ProfileInfoCard'

// Overview page components
import Header from './components/Header'

// Data
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import { useState } from 'react'

function Profile() {
  const [tabValue, setTabValue] = useState(0)
  const [editing, setEditing] = useState(false)

  const handleSetTabValue = (event, newValue) => setTabValue(newValue)

  const handleSetEdit = () => setEditing((prev) => !prev)

  return (
    <DashboardLayout>
      <Header tabValue={tabValue} handleSetTabValue={handleSetTabValue} />
      <SuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          {tabValue === 0 && (
            <Grid item xl={24}>
              <ProfileInfoCard
                title="profile information"
                description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: 'Alec M. Thompson',
                  email: 'alecthompson@mail.com',
                  DOB: '1/1/2000'
                }}
                action={{ onClick: handleSetEdit, tooltip: 'Edit Profile' }}
                editing={editing}
              />
            </Grid>
          )}
          {tabValue === 1 && (
            <Grid item xs={12} xl={4}>
              <form autoComplete="off" noValidate>
                <SuiBox
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ my: 2 }}
                >
                  <SuiInput
                    placeholder="New password"
                    fullWidth
                    autoComplete="password"
                    type="password"
                    label="New Password"
                  />
                </SuiBox>

                <SuiBox
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ my: 2 }}
                >
                  <SuiInput
                    placeholder="Confirm password"
                    fullWidth
                    autoComplete="confirm-password"
                    type="password"
                    label="Confirm Password"
                  />
                </SuiBox>

                <SuiButton size="large" type="button" variant="gradient" buttonColor="dark">
                  Update Password
                </SuiButton>
              </form>
            </Grid>
          )}
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Profile
