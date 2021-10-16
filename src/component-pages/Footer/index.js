import Link from '@material-ui/core/Link'
import Icon from '@material-ui/core/Icon'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

// Soft UI Dashboard Material-UI base styles
import typography from 'assets/theme/base/typography'

// Custom styles for the Footer
// import styles from 'component-pages/Footer/styles'

function Footer() {
  const { size } = typography
  // const classes = styles()

  return (
    <SuiBox
      width="100%"
      display="flex"
      flexDirection={{ xs: 'column', lg: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <SuiBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made with
        <SuiBox fontSize={size.regular} color="text" mb={-0.5} mx={0.25}>
          <Icon className="material-icons-round" color="inherit" fontSize="inherit">
            favorite
          </Icon>
        </SuiBox>
        by
        <Link href="https://www.google.com/" target="_blank">
          <SuiTypography variant="button" fontWeight="medium">
            &nbsp;Nhóm ??&nbsp;
          </SuiTypography>
        </Link>
        for a better web.
      </SuiBox>
    </SuiBox>
  )
}

export default Footer
