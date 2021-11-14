import {useState} from 'react'

import {useSelector, useDispatch} from 'react-redux'

import Grid from '@material-ui/core/Grid'

import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'

import Footer from 'component-pages/Footer'
import ProfileInfoCard from 'component-pages/Cards/InfoCards/ProfileInfoCard'
import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'

import Header from './components/Header'
import ModalRequestUpgrade from './components/ModalRequestUpgrade'

import UserApi from 'apis/user'
import validateData, {TYPE_SCHEMA} from 'utils/validationSchema'
import {openAlert} from 'redux/actions/alert'

function Profile() {
  const dispatch = useDispatch()
  const {profile: userProfile} = useSelector(state => state.userState)

  const [tabValue, setTabValue] = useState(0)
  const [editing, setEditing] = useState(false)

  const [formPassword, setFromPassword] = useState({})
  const [errors, setErrors] = useState({})

  const handleChangeFormPassword = key => e => {
    setErrors({...errors, [key]: ''})
    setFromPassword({...formPassword, [key]: e.target.value})
  }

  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
    if (formPassword.newPassword !== formPassword.confirmPassword) {
      setErrors({...errors, confirmPassword: 'Confirm password not match'})
      return
    }
    try {
      setLoading(true)
      await validateData(TYPE_SCHEMA.CHANGE_PASSWORD, formPassword, async dataChangePassword => {
        const payloadReq = {
          oldPass: dataChangePassword.oldPassword,
          newPass: dataChangePassword.newPassword
        }
        const {status, data, error} = await UserApi.changePassword(payloadReq)
        if (error) dispatch(openAlert({messageAlert: error, typeAlert: 'error'}))
        else {
          if (status === 200) {
            dispatch(openAlert({messageAlert: 'Change password success', typeAlert: 'success'}))
            setFromPassword({})
          } else
            dispatch(
              openAlert({messageAlert: data.message || 'Something error', typeAlert: 'error'})
            )
        }
      })
    } catch (errs) {
      setErrors(errs)
    }
    setLoading(false)
  }

  const handleSetTabValue = (event, newValue) => setTabValue(newValue)
  const handleSetEdit = () => setEditing(prev => !prev)

  const [modalUpgrade, setModalUpgrade] = useState(false)

  return (
    <>
      <DashboardLayout>
        <Header tabValue={tabValue} handleSetTabValue={handleSetTabValue} />
        <SuiBox mt={5} mb={3}>
          <Grid container spacing={3}>
            {tabValue === 0 && (
              <Grid item xs={12}>
                <ProfileInfoCard
                  title="profile information"
                  info={{
                    fullName: userProfile?.fullName,
                    email: userProfile?.email,
                    address: userProfile?.address,
                    account: userProfile?.role
                  }}
                  description=""
                  action={{onClick: handleSetEdit, tooltip: 'Edit Profile'}}
                  editing={editing}
                />
              </Grid>
            )}
            {tabValue === 1 && (
              <Grid item xs={12} lg={4}>
                <form autoComplete="off" noValidate>
                  <SuiBox
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{my: 2}}
                  >
                    <SuiInput
                      placeholder="Old password"
                      fullWidth
                      type="password"
                      label="New Password"
                      value={formPassword.oldPassword || ''}
                      onChange={handleChangeFormPassword('oldPassword')}
                      error={Boolean(errors.oldPassword)}
                    />
                  </SuiBox>

                  <SuiBox
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{my: 2}}
                  >
                    <SuiInput
                      placeholder="New password"
                      fullWidth
                      type="password"
                      label="New Password"
                      value={formPassword.newPassword || ''}
                      onChange={handleChangeFormPassword('newPassword')}
                      error={Boolean(errors.newPassword)}
                    />
                  </SuiBox>

                  <SuiBox
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{my: 2}}
                  >
                    <SuiInput
                      placeholder="Confirm password"
                      fullWidth
                      type="password"
                      label="Confirm Password"
                      value={formPassword.confirmPassword || ''}
                      onChange={handleChangeFormPassword('confirmPassword')}
                      error={Boolean(errors.confirmPassword)}
                    />
                  </SuiBox>

                  <SuiButton
                    size="large"
                    type="button"
                    variant="gradient"
                    buttonColor="dark"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? 'Send...' : 'Update Password'}
                  </SuiButton>
                </form>
              </Grid>
            )}
          </Grid>
        </SuiBox>
        <SuiBox mt={3} mb={3}>
          <SuiButton
            size="large"
            fullWidth
            variant="gradient"
            buttonColor="success"
            onClick={() => setModalUpgrade(true)}
          >
            Upgrade account seller
          </SuiButton>
        </SuiBox>
        <Footer />
      </DashboardLayout>
      {modalUpgrade && (
        <ModalRequestUpgrade show={modalUpgrade} onClose={() => setModalUpgrade(false)} />
      )}
    </>
  )
}

export default Profile
