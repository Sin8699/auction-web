// @material-ui core components
import Grid from '@material-ui/core/Grid'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'

// Soft UI Dashboard Material-UI example components
import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

// Data
import SuiTypography from 'components/SuiTypography'
import ProductCard from 'component-pages/Cards/ProjectCards/ProductCard'
// Images
import team1 from 'assets/images/team-1.jpg'
import Card from '@material-ui/core/Card'
import SuiButton from 'components/SuiButton'
import Icon from '@material-ui/core/Icon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useState } from 'react'
import SuiPagination from '../../components/SuiPagination/index'
import SuiInput from '../../components/SuiInput/index'
import { useGetProducts } from '../../apis/products/index'

function Dashboard() {
  const [openMenu, setOpenMenu] = useState(null)

  const handleOpenMenu = ({ currentTarget }) => setOpenMenu(currentTarget)
  const handleCloseMenu = () => setOpenMenu(null)
  const [{ data, loading, error }] = useGetProducts()

  const _renderData = () => {
    if (loading) {
      return <div>loading...</div>
    }

    if (error) {
      return <div>error</div>
    }

    return (
      <>
        {data.slice(0, 10).map(({ name, primaryImage, description, categories, id }) => (
          <Grid item xs={12} md={6} xl={3}>
            <ProductCard
              key={id}
              image={primaryImage}
              label="Phone"
              title={name}
              description={description}
              action={{
                type: 'internal',
                route: '/pages/profile/profile-overview',
                color: 'info',
                label: 'Buy Now'
              }}
              authors={[{ image: team1, name: 'Elena Morison' }]}
              info={<SuiButton buttonColor="error">Bid</SuiButton>}
              countDown={'00:21:00'}
            />
          </Grid>
        ))}
      </>
    )
  }

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
                <SuiButton variant="gradient" buttonColor="secondary" onClick={handleOpenMenu}>
                  Category
                  <Icon className="material-icons-round font-bold">keyboard_arrow_down</Icon>
                </SuiButton>
                <Menu
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  anchorEl={openMenu}
                  getContentAnchorEl={null}
                  open={Boolean(openMenu)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleCloseMenu}>Electronics</MenuItem>
                  <MenuItem onClick={handleCloseMenu}>Cloting</MenuItem>
                  <MenuItem onClick={handleCloseMenu}>Shoes</MenuItem>
                </Menu>
              </>
            </SuiBox>
          </SuiBox>
          <SuiBox p={2}>
            <Grid container spacing={3}>
              {_renderData()}
            </Grid>

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

export default Dashboard
