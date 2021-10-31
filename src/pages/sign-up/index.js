import {useState} from 'react'
import {Link} from 'react-router-dom'

import Card from '@material-ui/core/Card'
import Checkbox from '@material-ui/core/Checkbox'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'

import BasicLayout from 'layouts/authentication/components/BasicLayout'

import {ROUTER_DEFAULT} from 'constants/router'

import curved6 from 'assets/images/curved-images/curved14.jpg'

function SignUp() {
  const [formValue, setFormValue] = useState({})
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreement, setAgremment] = useState(false)

  const handleSetAgremment = () => setAgremment(!agreement)

  const handleChangeValue = key => e => {
    setFormValue({...formValue, [key]: e.target.value})
  }

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Register with
          </SuiTypography>
        </SuiBox>
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput
                placeholder="Full name"
                value={formValue.fullName || ''}
                onChange={handleChangeValue('fullName')}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="email"
                placeholder="Email"
                value={formValue.email || ''}
                onChange={handleChangeValue('email')}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="password"
                placeholder="Password"
                value={formValue.password || ''}
                onChange={handleChangeValue('password')}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </SuiBox>
            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                customClass="cursor-pointer user-select-none"
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton variant="gradient" buttonColor="dark" fullWidth>
                sign up
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
                  Sign up
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
