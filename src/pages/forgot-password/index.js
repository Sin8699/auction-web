import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'

import CoverLayout from 'layouts/authentication/components/CoverLayout'

import {ROUTER_DEFAULT} from 'constants/router'

import curved9 from 'assets/images/curved-images/curved-6.jpg'

import {useFormik, FormikProvider, Form} from 'formik'
import * as Yup from 'yup'

import UserApi from 'apis/user'
import {openAlert} from 'redux/actions/alert'

function ForgotPassword() {
  const dispatch = useDispatch()
  const [sendSuccess, setSendSuccess] = useState(false)

  const EmailSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  })

  const formik = useFormik({
    initialValues: {email: ''},
    validationSchema: EmailSchema,
    onSubmit: async ({email}) => {
      const {status, data, error} = await UserApi.resetPassword(email)
      if (error) dispatch(openAlert({messageAlert: error, typeAlert: 'error'}))
      else {
        const isFail = () => {
          dispatch(openAlert({messageAlert: data.message || 'Something error', typeAlert: 'error'}))
        }
        status === 200 ? setSendSuccess(true) : isFail()
      }
    }
  })

  const {handleSubmit, errors, getFieldProps, isSubmitting} = formik

  return (
    <CoverLayout
      title="Forgot password"
      description={!sendSuccess ? `You don't remember your password?` : 'Please check your mail'}
      image={curved9}
    >
      <SuiBox>
        {!sendSuccess &&
          'Enter your email and we will send you instruction to reset your password.'}
      </SuiBox>
      {!sendSuccess && (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <SuiBox direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
              <SuiInput
                placeholder="Your email"
                fullWidth
                autoComplete="username"
                type="email"
                label="Email address"
                error={!!errors.email}
                {...getFieldProps('email')}
              />
            </SuiBox>
            <SuiButton
              size="large"
              type="submit"
              variant="gradient"
              buttonColor="dark"
              disabled={isSubmitting}
            >
              {!isSubmitting ? 'Send to reset' : 'Send...'}
            </SuiButton>
          </Form>
        </FormikProvider>
      )}
      {sendSuccess && (
        <SuiButton
          size="large"
          variant="gradient"
          buttonColor="dark"
          component={Link}
          to={ROUTER_DEFAULT.SIGN_IN}
        >
          Back to login page
        </SuiButton>
      )}
    </CoverLayout>
  )
}

export default ForgotPassword
