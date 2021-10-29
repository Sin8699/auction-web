import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

// components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import Header from 'layouts/authentication/components/Header'
import PageLayout from 'component-pages/LayoutContainers/PageLayout'

import Footer from 'layouts/authentication/components/Footer'
import styles from 'layouts/authentication/components/CoverLayout/styles'

import routes from 'routes'

function CoverLayout({ color, header, title, description, image, top, children, style }) {
  const classes = styles({ image })

  return (
    <PageLayout background="white" style={style}>
      <Header routes={routes} />
      <Grid container justifyContent="center" className={classes.coverLayout}>
        <Grid item xs={11} sm={8} md={5} xl={3}>
          <SuiBox mt={top}>
            <SuiBox pt={3} px={3}>
              {!header ? (
                <>
                  <SuiBox mb={1}>
                    <SuiTypography variant="h3" fontWeight="bold" textColor={color} textGradient>
                      {title}
                    </SuiTypography>
                  </SuiBox>
                  <SuiTypography variant="body2" fontWeight="regular" textColor="text">
                    {description}
                  </SuiTypography>
                </>
              ) : (
                header
              )}
            </SuiBox>
            <SuiBox p={3}>{children}</SuiBox>
          </SuiBox>
        </Grid>
        <Grid item xs={12} md={5}>
          <SuiBox
            display={{ xs: 'none', md: 'block' }}
            position="relative"
            right={{ md: '-12rem', xl: '-16rem' }}
            customClass={classes.coverLayout_imageBox}
          >
            <SuiBox customClass={classes.coverLayout_image} />
          </SuiBox>
        </Grid>
      </Grid>
      <Footer />
    </PageLayout>
  )
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = { header: '', title: '', description: '', color: 'info', top: 20 }

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
    'light'
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired
}

export default CoverLayout
