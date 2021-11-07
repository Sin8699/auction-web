import {useMemo, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {Grid, Card, Icon, CircularProgress} from '@material-ui/core'
import {Menu, MenuItem, SubMenu} from '@szhsin/react-menu'

import keyBy from 'lodash/keyBy'
import chunk from 'lodash/chunk'

import SuiBox from '../../components/SuiBox'
import SuiButton from '../../components/SuiButton'
import SuiInput from '../../components/SuiInput'
import SuiPagination from '../../components/SuiPagination'
import TablePagination from '../../components/TablePagination'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import BidModal from './components/BidModal'
import BuyNowModal from './components/BuyNowModal'
import ProductCard from './components/ProductCard'

import ModalNewBidding from './components/CreateProductBiddingModal'

import team1 from 'assets/images/team-1.jpg'

import {useGetProducts} from '../../apis/products/index'
import {useGetBiddingProducts} from '../../apis/bidding-product/index'

import {getListCategories} from 'helpers/category'
import {searchingData} from 'redux/actions/search'
import React from '../../components/MenuAction/index'
import useDebounce from '../../hooks/useDebounce'

const LIMIT_PAGINATION = 12

function BiddingBoard() {
  const {dataCategory} = useSelector(state => state.categoryState)
  const {dataSubCategory} = useSelector(state => state.subCategoryState)
  // const { results = {} } = useSelector((state) => state.searchState)

  const [searchText, setSearchText] = useState('')

  const debouncedValue = useDebounce(searchText, 300)
  const dispatch = useDispatch()

  const [{data: products = [], loading: loadingProducts, error: errorProducts}] = useGetProducts()

  const [
    {data: biddingProducts = [], loading: loadingBiddingProducts, error: errorBiddingProducts}
  ] = useGetBiddingProducts()

  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!debouncedValue) return
    dispatch(searchingData({query: debouncedValue}))
  }, [debouncedValue, dispatch])

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
          <CircularProgress />
        </SuiBox>
      )
    }

    if (errorProducts || errorBiddingProducts) {
      return <div>error</div>
    }

    const objectBiddingProduct = keyBy(biddingProducts, 'product')

    return (
      <Grid container spacing={3}>
        {listByPage.map(({name, primaryImage, description, categories, _id}) => (
          <Grid item xs={12} md={6} xl={3} key={_id}>
            <ProductCard
              id={_id}
              image={primaryImage}
              label="Phone"
              title={name}
              description={description}
              action={{
                type: 'comp',
                comp: <BuyNowModal biddingProduct={objectBiddingProduct?.[_id]} />,
                color: 'info'
              }}
              authors={[{image: team1, name: 'Elena Morison'}]}
              info={<BidModal biddingProduct={objectBiddingProduct?.[_id]} productName={name} />}
              countDown={60000} //seconds
            />
          </Grid>
        ))}
      </Grid>
    )
  }

  const [openModal, setOpenModal] = useState(false)

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mb={2} mt={2}>
        <SuiButton
          fullWidth
          buttonColor="dark"
          variant="gradient"
          onClick={() => setOpenModal(true)}
        >
          You are a seller, create a new auction product here
        </SuiButton>
        <ModalNewBidding show={openModal} onClose={() => setOpenModal(false)} />
      </SuiBox>
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
                {getListCategories(dataCategory, dataSubCategory).map(item => {
                  if (item.sub.length > 0)
                    return (
                      <SubMenu label={item.name} key={item.name}>
                        {item.sub.map(itemSub => (
                          <MenuItem key={itemSub.name}>{itemSub.name}</MenuItem>
                        ))}
                      </SubMenu>
                    )
                  return <MenuItem key={item.name}>{item.name}</MenuItem>
                })}
              </Menu>
            </SuiBox>
            <SuiBox display="flex" mb={1}>
              <SuiBox mr={1}>
                <SuiInput
                  withIcon={{icon: 'search', direction: 'right'}}
                  placeholder="Search name, category"
                  onChange={e => setSearchText(e.target.value)}
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
                      End Time (
                      <Icon className="material-icons-round font-bold">arrow_downward</Icon>)
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

export default BiddingBoard
