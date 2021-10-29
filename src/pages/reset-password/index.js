// components
import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import queryString from 'query-string'
// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout'
import { toast } from 'toastr'
// Images
import curved9 from 'assets/images/curved-images/curved-6.jpg'

import { useState } from 'react'
import { useAxios } from '../../apis/useAxiosConfig'

function ResetPassword() {
  const { fetchData: resetPasswordClient } = useAxios('/', false)

  const [values, setValues] = useState({
    confirmPassword: '',
    newPassword: ''
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const { confirmPassword, newPassword } = values
    if (confirmPassword !== newPassword) {
      toast.error("Confirm Password don't match", {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      })
      return
    }

    const { location } = window
    const { key, email } = queryString.parse(location.search)

    const code = await resetPasswordClient({
      forgotKey: key,
      email,
      password: newPassword
    })

    if (code === 0) {
      // navigate(ROUTER_DEFAULT.SIGN_IN, { replace: true })
    }
  }

  return (
    <CoverLayout title="Welcome back" description="Reset password" image={curved9}>
      <SuiBox component="form" role="form">
        <form autoComplete="off" noValidate onSubmit={onSubmit}>
          <SuiBox direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <SuiInput
              placeholder="New password"
              fullWidth
              autoComplete="password"
              type="password"
              label="New Password"
              onChange={handleChange}
            />
          </SuiBox>

          <SuiBox direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <SuiInput
              placeholder="Confirm password"
              fullWidth
              autoComplete="confirm-password"
              type="password"
              label="Confirm Password"
              onChange={handleChange}
            />
          </SuiBox>

          <SuiButton size="large" type="button" variant="gradient" buttonColor="dark">
            Save
          </SuiButton>
        </form>
      </SuiBox>
    </CoverLayout>
  )
}

export default ResetPassword
