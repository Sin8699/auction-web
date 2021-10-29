// components
import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'

// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout'

// Images
import curved9 from 'assets/images/curved-images/curved-6.jpg'

import { useFormik, Form, FormikProvider } from 'formik'

import * as Yup from 'yup'

function ForgotPassword() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  })

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async ({ email }) => {}
  })

  const { handleSubmit } = formik

  return (
    <CoverLayout title="Welcome back" description="Forgot password" image={curved9}>
      <SuiBox component="form" role="form">
        <SuiBox>Enter your email and we will send you instruction to reset your password.</SuiBox>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <SuiBox
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <SuiInput
                placeholder="Your email"
                fullWidth
                autoComplete="username"
                type="email"
                label="Email address"
              />
            </SuiBox>
            <SuiButton size="large" type="button" variant="gradient" buttonColor="dark">
              Send to reset
            </SuiButton>
          </Form>
        </FormikProvider>
      </SuiBox>
    </CoverLayout>
  )
}

export default ForgotPassword
