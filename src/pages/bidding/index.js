/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import get from 'lodash/get'

import {Grid, Card, Icon, CircularProgress} from '@material-ui/core'
import {Menu, MenuItem, SubMenu} from '@szhsin/react-menu'

import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import SuiInput from 'components/SuiInput'
import SuiPagination from 'components/SuiPagination'
import TablePagination from 'components/TablePagination'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import BidModal from './components/BidModal'
import BuyNowModal from './components/BuyNowModal'
import ProductCard from './components/ProductCard'
import ModalNewBidding from './components/CreateProductBiddingModal'

import team1 from 'assets/images/team-1.jpg'

import useDebounce from '../../hooks/useDebounce'

import {getListCategories} from 'helpers/category'

import {searchingData} from 'redux/actions/search'
import {requestBiddingProductsData} from 'redux/actions/bidding-product'

const LIMIT_PAGINATION = 12

function BiddingBoard() {
  const dispatch = useDispatch()

  const {dataCategory} = useSelector(state => state.categoryState)
  const {dataSubCategory} = useSelector(state => state.subCategoryState)
  const {listBiddingProducts, loadingListBiddingProduct} = useSelector(
    state => state.biddingProductState
  )
  console.log('listBiddingProducts: ', listBiddingProducts)

  // const { results = {} } = useSelector((state) => state.searchState)

  const [searchText, setSearchText] = useState('')

  const debouncedValue = useDebounce(searchText, 300)

  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!debouncedValue) return
    dispatch(searchingData({query: debouncedValue}))
  }, [debouncedValue])

  useEffect(() => {
    dispatch(requestBiddingProductsData())
  }, [debouncedValue])

  const _renderData = () => {
    if (loadingListBiddingProduct) {
      return (
        <SuiBox display="flex" justifyContent="center">
          <CircularProgress />
        </SuiBox>
      )
    }
    return (
      <Grid container spacing={3}>
        {listBiddingProducts
          .slice((page - 1) * LIMIT_PAGINATION, (page - 1) * LIMIT_PAGINATION + LIMIT_PAGINATION)
          .map(
            ({
              _id,
              product,
              status,
              allowBuyNow,
              buyNowPrice,
              stepPrice,
              initPrice,
              currentPrice,
              publicTime,
              endTime
            }) => (
              <Grid item xs={12} md={6} xl={3} key={_id}>
                <ProductCard
                  idProduct={get(product, '_id')}
                  category={get(product, 'category.name')}
                  subCategory={get(product, 'subCategory.name')}
                  nameProduct={get(product, 'name')}
                  imageUrl={get(product, 'imageUrl')}
                  buttonBid={
                    <BidModal
                      biddingProduct={get(product, '_id')}
                      productName={get(product, 'name')}
                    />
                  }
                  buttonBuyNow={<BuyNowModal biddingProduct={get(product, '_id')} />}
                  authors={[{image: team1, name: 'Elena Morison'}]}
                  endTime={endTime}
                />
              </Grid>
            )
          )}
      </Grid>
    )
  }

  const [openModal, setOpenModal] = useState(false)
  const handleSuccessCreate = () => {
    setOpenModal(false)
  }

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
        {openModal && (
          <ModalNewBidding
            show={openModal}
            onClose={() => setOpenModal(false)}
            onSuccess={handleSuccessCreate}
          />
        )}
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
                  totalPage={Math.ceil(listBiddingProducts.length / LIMIT_PAGINATION)}
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
