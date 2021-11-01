import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Card, Checkbox, CircularProgress} from '@material-ui/core'
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import BasicLayout from 'layouts/authentication/components/BasicLayout'
import {ROUTER_DEFAULT} from 'constants/router'
import curved6 from 'assets/images/curved-images/curved14.jpg'
import UserApi from 'apis/user'
import validateData, {TYPE_SCHEMA} from 'utils/validationSchema'
import {openAlert} from 'redux/actions/alert'

function SignUp() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [formValue, setFormValue] = useState({})
  const [errors, setErrors] = useState({})
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [agreement, setAgreement] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSetAgreement = () => setAgreement(!agreement)

  const handleChangeValue = key => e => {
    setErrors({...errors, [key]: ''})
    setFormValue({...formValue, [key]: e.target.value})
  }

  const handleSubmit = async () => {
    if (!agreement) {
      const text = 'You need to accept the Terms and Conditions'
      const infoAlert = {messageAlert: text, typeAlert: 'warning'}
      dispatch(openAlert(infoAlert))
      return
    }
    if (!confirmPassword) setConfirmPasswordError('Confirm password is required')
    try {
      setLoading(true)
      await validateData(
        TYPE_SCHEMA.REGISTER,
        {
          fullName: formValue.fullName,
          email: formValue.email,
          password: formValue.password
        },
        async dataRegister => {
          if (formValue.password !== confirmPassword)
            setConfirmPasswordError('Confirm password not match')
          else {
            const {status, data, error} = await UserApi.register(dataRegister)
            if (error) dispatch(openAlert({messageAlert: error, typeAlert: 'error'}))
            else {
              status === 200
                ? history.push(ROUTER_DEFAULT.SIGN_UP_SUCCESS)
                : dispatch(
                    openAlert({
                      messageAlert: data.message || 'Something error',
                      typeAlert: 'error'
                    })
                  )
            }
          }
        }
      )
    } catch (errs) {
      setErrors(errs)
    }
    setLoading(false)
  }

  return (
    <BasicLayout
      title="Register"
      description="Please fill the information below to complete the registration."
      image={curved6}
    >
      <Card>
        <SuiBox p={3} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Information
          </SuiTypography>
        </SuiBox>
        <SuiBox pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput
                placeholder="Full name"
                value={formValue.fullName || ''}
                onChange={handleChangeValue('fullName')}
                error={Boolean(errors.fullName)}
              />
              {Boolean(errors.fullName) && (
                <SuiBox ml={0.5}>
                  <SuiTypography component="label" variant="caption" textColor="error">
                    {errors.fullName}
                  </SuiTypography>
                </SuiBox>
              )}
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="email"
                placeholder="Email"
                value={formValue.email || ''}
                onChange={handleChangeValue('email')}
                error={Boolean(errors.email)}
              />
              {Boolean(errors.email) && (
                <SuiBox ml={0.5}>
                  <SuiTypography component="label" variant="caption" textColor="error">
                    {errors.email}
                  </SuiTypography>
                </SuiBox>
              )}
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="password"
                placeholder="Password"
                value={formValue.password || ''}
                onChange={handleChangeValue('password')}
                error={Boolean(errors.password)}
              />
              {Boolean(errors.password) && (
                <SuiBox ml={0.5}>
                  <SuiTypography component="label" variant="caption" textColor="error">
                    {errors.password}
                  </SuiTypography>
                </SuiBox>
              )}
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                error={Boolean(confirmPasswordError)}
              />
              {Boolean(confirmPasswordError) && (
                <SuiBox ml={0.5}>
                  <SuiTypography component="label" variant="caption" textColor="error">
                    {confirmPasswordError}
                  </SuiTypography>
                </SuiBox>
              )}
            </SuiBox>
            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgreement} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                customClass="cursor-pointer user-select-none"
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SuiTypography>
              <SuiTypography textColor="error">*</SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton
                variant="gradient"
                buttonColor="dark"
                fullWidth
                disabled={loading}
                onClick={handleSubmit}
              >
                {!loading ? 'sign up' : <CircularProgress size={15} color="inherit" />}
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" textColor="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to={ROUTER_DEFAULT.SIGN_IN}
                  variant="button"
                  textColor="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  )
}

export default SignUp
