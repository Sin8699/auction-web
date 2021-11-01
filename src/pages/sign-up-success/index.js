import {Link} from 'react-router-dom'
import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import BasicLayout from 'layouts/authentication/components/BasicLayout'
import {ROUTER_DEFAULT} from 'constants/router'
import curved6 from 'assets/images/curved-images/curved14.jpg'

function SignUpSuccess() {
  return (
    <BasicLayout
      title="Register success"
      description="Please check your email to verify your email."
      image={curved6}
    >
      <SuiBox mt={6} mb={15}>
        <SuiButton
          variant="gradient"
          buttonColor="white"
          fullWidth
          component={Link}
          to={ROUTER_DEFAULT.SIGN_IN}
        >
          Back to login page
        </SuiButton>
      </SuiBox>
    </BasicLayout>
  )
}

export default SignUpSuccess
