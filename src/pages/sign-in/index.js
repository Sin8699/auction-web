import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// @material-ui components
import Switch from '@material-ui/core/Switch'

// components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'

// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout'
import Socials from 'layouts/authentication/components/Socials'
import Separator from 'layouts/authentication/components/Separator'

// Images
import curved9 from 'assets/images/curved-images/curved-6.jpg'

import { ROUTER_DEFAULT } from 'constants/router'
import { saveToStorage } from 'utils/storage'
import validateData, { TYPE_SCHEMA } from 'utils/validationSchema'

function SignIn() {
  const history = useHistory()

  const [rememberMe, setRememberMe] = useState(false)
  const [formValue, setFormValue] = useState({})
  const [errors, setErrors] = useState({})

  const handleSetRememberMe = () => setRememberMe(!rememberMe)

  const handleChangeForm = (key) => (event) => {
    setErrors({ ...errors, [key]: false })
    setFormValue({ ...formValue, [key]: event.target.value })
  }

  const handleSubmit = async () => {
    try {
      await validateData(TYPE_SCHEMA.LOGIN, { ...formValue }, (data) => {
        saveToStorage('isLogin', true) //change after done function login
        history.replace(ROUTER_DEFAULT.DASHBOARD)
      })
    } catch (errs) {
      setErrors(errs)
    }
  }

  return (
    <CoverLayout title="Welcome back" description="Login with" image={curved9}>
      <SuiBox mb={2}>
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
        <SuiBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SuiTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            customClass="cursor-pointer user-select-none"
          >
            &nbsp;&nbsp;Remember me (unavailable)
          </SuiTypography>
        </SuiBox>
        <SuiButton
          mt={4}
          component="a"
          href={'/forgot-password'}
          variant="text"
          buttonColor={'info'}
        >
          Forget password
        </SuiButton>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={handleSubmit}>
            sign in
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
