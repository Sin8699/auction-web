import Card from '@material-ui/core/Card'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'

// Soft UI Dashboard Material-UI example components
import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import { Menu, MenuItem, SubMenu } from '@szhsin/react-menu'
import SuiButton from 'components/SuiButton'
import Icon from '@material-ui/core/Icon'
import SuiPagination from 'components/SuiPagination'

function ProductDetail() {
  return (
    <DashboardLayout>
      <Header />
      <SuiBox mb={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" pt={2} px={2}>
            <SuiBox mb={0.5}>
              <SuiTypography variant="h6" fontWeight="medium">
                Product
              </SuiTypography>
            </SuiBox>
            <SuiBox display="flex" mb={1}>
              <SuiBox mr={1}>
                <SuiInput withIcon={{ icon: 'search', direction: 'right' }} placeholder="Search" />
              </SuiBox>
              <>
                <Menu
                  menuButton={
                    <SuiButton variant="gradient" buttonColor="secondary">
                      Category
                      <Icon className="material-icons-round font-bold">keyboard_arrow_down</Icon>
                    </SuiButton>
                  }
                >
                  <MenuItem>New File</MenuItem>
                  <SubMenu label="Open">
                    <MenuItem>index.html</MenuItem>
                    <MenuItem>example.js</MenuItem>
                    <SubMenu label="Styles">
                      <MenuItem>about.css</MenuItem>
                      <MenuItem>home.css</MenuItem>
                      <MenuItem>index.css</MenuItem>
                    </SubMenu>
                  </SubMenu>
                  <MenuItem>Save</MenuItem>
                </Menu>
              </>
            </SuiBox>
          </SuiBox>
          <SuiBox p={2}>

            <SuiPagination variant="contained">
              <SuiPagination item>
                <Icon className="material-icons-round font-bold">chevron_left</Icon>
              </SuiPagination>
              <SuiPagination active item>
                1
              </SuiPagination>
              <SuiPagination item>2</SuiPagination>
              <SuiPagination item>3</SuiPagination>
              <SuiPagination item>
                <Icon className="material-icons-round font-bold">chevron_right</Icon>
              </SuiPagination>
            </SuiPagination>
          </SuiBox>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default ProductDetail
