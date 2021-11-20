// import {Link} from 'react-router-dom'
import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import BasicLayout from 'layouts/authentication/components/BasicLayout'
// import {ROUTER_DEFAULT} from 'constants/router'
import curved6 from 'assets/images/curved-images/curved14.jpg'

function VerifyError() {
  return (
    <BasicLayout
      title="Verify error"
      description="Please check your email to verify your email again or contact with admin."
      image={curved6}
    >
      <SuiBox mt={6} mb={15}>
        <SuiButton
          variant="gradient"
          buttonColor="error"
          fullWidth
          //   component={Link}
          //   to={ROUTER_DEFAULT.SIGN_UP}
        >
          Why am I seeing this message?
        </SuiButton>
      </SuiBox>
    </BasicLayout>
  )
}

export default VerifyError
