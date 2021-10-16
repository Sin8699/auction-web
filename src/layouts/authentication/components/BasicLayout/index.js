import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import Header from 'layouts/authentication/components/Header'
import PageLayout from 'component-pages/LayoutContainers/PageLayout'

import Footer from 'layouts/authentication/components/Footer'

import styles from 'layouts/authentication/components/BasicLayout/styles'

import routes from 'routes'

function BasicLayout({ title, description, image, children }) {
  const classes = styles({ image })

  return (
    <PageLayout>
      <Header routes={routes} transparent light />
      <SuiBox customClass={classes.basicLayout}>
        <Grid container spacing={3} justifyContent="center" className="text-center">
          <Grid item xs={10} lg={4}>
            <SuiBox mt={6} mb={1}>
              <SuiTypography variant="h1" textColor="white" fontWeight="bold">
                {title}
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={2}>
              <SuiTypography variant="body2" textColor="white" fontWeight="regular">
                {description}
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mt={{ xs: -26, lg: -24 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </PageLayout>
  )
}

BasicLayout.defaultProps = { title: '', description: '' }

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default BasicLayout
