// @material-ui core components
import Grid from '@material-ui/core/Grid'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'

// Soft UI Dashboard Material-UI example components
import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

// Images
import team1 from 'assets/images/team-1.jpg'
import Card from '@material-ui/core/Card'
import SuiButton from 'components/SuiButton'
import Icon from '@material-ui/core/Icon'
import { Menu, MenuItem, SubMenu } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

import CircularProgress from '@material-ui/core/CircularProgress'
import SuiPagination from '../../components/SuiPagination/index'
import SuiInput from '../../components/SuiInput/index'
import { useGetProducts } from '../../apis/products/index'
import { useGetBiddingProducts } from '../../apis/bidding-product/index'
import BuyNowModal from './components/BuyNowModal/index'
import keyBy from 'lodash/keyBy'
import BidModal from './components/BidModal/index'
import { useState } from 'react'
import chunk from 'lodash/chunk'
import { useMemo } from 'react'
import TablePagination from '../../components/TablePagination/index'
import ProductCard from './components/ProductCard/index'

const LIMIT_PAGINATION = 12

function Dashboard() {
  const [{ data: products = [], loading: loadingProducts, error: errorProducts }] = useGetProducts()
  const [
    { data: biddingProducts = [], loading: loadingBiddingProducts, error: errorBiddingProducts }
  ] = useGetBiddingProducts()

  const [page, setPage] = useState(1)

  const chuckList = useMemo(() => {
    if (loadingProducts || loadingBiddingProducts || errorProducts || errorBiddingProducts) {
      return []
    }
    return chunk(products || [], LIMIT_PAGINATION)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorBiddingProducts, errorProducts, loadingBiddingProducts, loadingProducts])

  const listByPage = chuckList?.[page] || []

  const _renderData = () => {
    if (loadingProducts || loadingBiddingProducts) {
      return (
        <SuiBox display="flex" justifyContent="center">
          <CircularProgress color="info" />
        </SuiBox>
      )
    }

    if (errorProducts || errorBiddingProducts) {
      return <div>error</div>
    }

    const objectBiddingProduct = keyBy(biddingProducts, 'product')

    return (
      <Grid container spacing={3}>
        {listByPage.map(({ name, primaryImage, description, categories, _id }) => (
          <Grid item xs={12} md={6} xl={3}>
            <ProductCard
              key={_id}
              id={_id}
              image={primaryImage}
              label="Phone"
              title={name}
              description={description}
              action={{
                type: 'comp',
                comp: <BuyNowModal biddingProduct={objectBiddingProduct?.[_id]} />
              }}
              authors={[{ image: team1, name: 'Elena Morison' }]}
              info={<BidModal biddingProduct={objectBiddingProduct?.[_id]} productName={name} />}
              countDown={60000} //seconds
            />
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mb={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" pt={2} px={2}>
            <SuiBox mb={0.5} display="flex" alignItems="center">
              <Menu
                menuButton={
                  <SuiButton variant="gradient" buttonColor="warning">
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
            </SuiBox>
            <SuiBox display="flex" mb={1}>
              <SuiBox mr={1}>
                <SuiInput
                  withIcon={{ icon: 'search', direction: 'right' }}
                  placeholder="Search name, category"
                />
              </SuiBox>
              <>
                <SuiBox ml={0.5}>
                  <Menu
                    menuButton={
                      <SuiButton variant="gradient" buttonColor="info">
                        Sort by
                        <Icon className="material-icons-round font-bold">keyboard_arrow_down</Icon>
                      </SuiButton>
                    }
                  >
                    <MenuItem>
                      Time (<Icon className="material-icons-round font-bold">arrow_downward</Icon>)
                    </MenuItem>
                    <MenuItem>
                      Price (<Icon className="material-icons-round font-bold">arrow_upward</Icon>)
                    </MenuItem>
                  </Menu>
                </SuiBox>
              </>
            </SuiBox>
          </SuiBox>
          <SuiBox p={2}>
            {_renderData()}

            <SuiBox mt={2}>
              <SuiPagination variant="contained">
                <TablePagination
                  page={page}
                  totalPage={Math.ceil(products.length / LIMIT_PAGINATION) - 1}
                  onChangePage={setPage}
                />
              </SuiPagination>
            </SuiBox>
          </SuiBox>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Dashboard
