import {useState, useCallback} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
// @material-ui components
import {CircularProgress} from '@material-ui/core'

// components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'

// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout'
import Socials from './Socials'
import Separator from 'layouts/authentication/components/Separator'

import curved9 from 'assets/images/curved-images/curved-6.jpg'

import {ROUTER_DEFAULT} from 'constants/router'
import UserApi from 'apis/user'
import validateData, {TYPE_SCHEMA} from 'utils/validationSchema'
import {saveToStorage} from 'utils/storage'
import {openAlert} from 'redux/actions/alert'
import {GoogleReCaptcha, useGoogleReCaptcha} from 'react-google-recaptcha-v3'

function SignIn() {
  const history = useHistory()
  const dispatch = useDispatch()
  const {executeRecaptcha} = useGoogleReCaptcha()

  const [formValue, setFormValue] = useState({})
  const [errors, setErrors] = useState({})

  const handleChangeForm = key => event => {
    setErrors({...errors, [key]: ''})
    setFormValue({...formValue, [key]: event.target.value})
  }

  const [loading, setLoading] = useState(false)

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }

    const token = await executeRecaptcha('auction')
    // Do whatever you want with the token
    return !!token
  }, [executeRecaptcha])

  const handleSubmit = async () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
      const isSuccessRecaptcha = await handleReCaptchaVerify()

      if (!isSuccessRecaptcha) return
    }

    setLoading(true)
    try {
      await validateData(TYPE_SCHEMA.LOGIN, {...formValue}, async dataLogin => {
        const {status, data, error} = await UserApi.login(dataLogin)
        console.log('data: ', data)
        if (error) dispatch(openAlert({messageAlert: error, typeAlert: 'error'}))
        else {
          const isLoginSuccess = () => {
            saveToStorage('user', {
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              role: data.role
            })
            history.replace(ROUTER_DEFAULT.DASHBOARD)
          }
          status === 200
            ? isLoginSuccess()
            : dispatch(
                openAlert({messageAlert: data.message || 'Something error', typeAlert: 'error'})
              )
        }
      })
    } catch (errs) {
      setErrors(errs)
    }
    setLoading(false)
  }

  const handleSignInGoogle = () => {
    alert('Sign in Google')
  }

  return (
    <CoverLayout title="Welcome back" description="Login with" image={curved9}>
      <GoogleReCaptcha />
      <SuiBox mb={2} onClick={handleSignInGoogle}>
        <Socials />
      </SuiBox>
      <Separator />
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput
            required
            type="email"
            placeholder="Email"
            onChange={handleChangeForm('email')}
            value={formValue.email || ''}
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
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SuiTypography>
          </SuiBox>
          <SuiInput
            required
            type="password"
            placeholder="Password"
            onChange={handleChangeForm('password')}
            value={formValue.password || ''}
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
        <SuiButton
          mt={4}
          component={Link}
          to={ROUTER_DEFAULT.FORGOT_PASSWORD}
          variant="text"
          buttonColor={'info'}
        >
          Forget password
        </SuiButton>
        <SuiBox mt={4} mb={1}>
          <SuiButton
            variant="gradient"
            buttonColor="info"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {!loading ? 'sign in' : <CircularProgress size={15} color="inherit" />}
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" textColor="text" fontWeight="regular">
            Don&apos;t have an account?{' '}
            <SuiTypography
              component={Link}
              to={ROUTER_DEFAULT.SIGN_UP}
              variant="button"
              textColor="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  )
}

export default SignIn
