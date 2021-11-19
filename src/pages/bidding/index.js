/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import get from 'lodash/get'
import {Grid, Card, Icon, CircularProgress} from '@material-ui/core'
import {Menu, MenuItem, SubMenu, MenuRadioGroup} from '@szhsin/react-menu'
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
import {orderBy} from 'lodash-es'

const LIMIT_PAGINATION = 12

const SORT_KEYS = {TIME_DESC: 'time_desc', PRICE_ASC: 'price_asc'}

function BiddingBoard() {
  const dispatch = useDispatch()

  const {profile} = useSelector(state => state.userState)
  const {dataCategory} = useSelector(state => state.categoryState)
  const {dataSubCategory} = useSelector(state => state.subCategoryState)
  const {listBiddingProducts, loadingListBiddingProduct} = useSelector(
    state => state.biddingProductState
  )
  const {loading, results} = useSelector(state => state.searchState)

  const [list, setList] = useState([])
  const [sortByState, setSortByState] = useState('')
  const [filterByCategory, setFilterByCategory] = useState('all')

  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState('')

  const debouncedValue = useDebounce(searchText, 300)

  useEffect(() => {
    dispatch(requestBiddingProductsData())
  }, [])

  useEffect(() => {
    // if (!debouncedValue) return
    dispatch(searchingData({query: debouncedValue}))
  }, [debouncedValue])

  useEffect(() => {
    results.length === 0 ? setList(listBiddingProducts) : setList(results)
  }, [results, listBiddingProducts])

  const _renderData = () => {
    if (loadingListBiddingProduct || loading) {
      return (
        <SuiBox display="flex" justifyContent="center">
          <CircularProgress />
        </SuiBox>
      )
    }

    const listFiltered =
      filterByCategory !== 'all'
        ? list.filter(({product}) =>
            [get(product, 'category._id'), get(product, 'subCategory._id')].includes(
              filterByCategory
            )
          )
        : list

    return (
      <Grid container spacing={3}>
        {listFiltered
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
              endTime,
              winner
            }) => (
              <Grid item xs={12} md={6} xl={3} key={_id}>
                <ProductCard
                  publicTime={publicTime}
                  biddingProductId={_id}
                  idProduct={get(product, '_id')}
                  category={get(product, 'category.name')}
                  subCategory={get(product, 'subCategory.name')}
                  nameProduct={get(product, 'name')}
                  imageUrl={get(product, 'imageUrl')}
                  buttonBid={
                    <BidModal
                      biddingProductId={_id}
                      productName={get(product, 'name')}
                      stepPrice={stepPrice}
                      currentPrice={currentPrice}
                      initPrice={initPrice}
                      buyNowPrice={buyNowPrice}
                    />
                  }
                  buttonBuyNow={<BuyNowModal biddingProduct={_id} priceBuyNow={buyNowPrice} />}
                  authors={[{image: team1, name: 'Elena Morison'}]}
                  winner={winner}
                  endTime={endTime}
                  buyNow={{allowBuyNow, buyNowPrice}}
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
    setTimeout(() => {
      dispatch(requestBiddingProductsData())
    }, 2000)
  }

  const handleSort = sort => {
    if (sort === SORT_KEYS.TIME_DESC) {
      const sorted = orderBy(list, ['publicTime'], ['desc'])
      setSortByState(SORT_KEYS.TIME_DESC)
      setList(sorted)
    } else {
      const sorted = orderBy(list, ['buyNowPrice'], ['asc'])
      setSortByState(SORT_KEYS.PRICE_ASC)
      setList(sorted)
    }
  }

  const handleMenuCategory = e => {
    setFilterByCategory(e?.value)
  }

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mb={2} mt={2}>
        {profile.role === 'SELLER' && (
          <SuiButton
            fullWidth
            buttonColor="dark"
            variant="gradient"
            onClick={() => setOpenModal(true)}
          >
            You are a seller, create a new auction product here
          </SuiButton>
        )}
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
            <SuiBox mb={0.5}>
              <Menu
                menuButton={
                  <SuiButton variant="gradient" buttonColor="warning">
                    Category
                    <Icon className="material-icons-round font-bold">keyboard_arrow_down</Icon>
                  </SuiButton>
                }
                onItemClick={handleMenuCategory}
              >
                {[
                  {name: 'All', sub: [], _id: 'all'},
                  ...getListCategories(dataCategory, dataSubCategory)
                ].map(item => {
                  if (item.sub.length > 0)
                    return (
                      <SubMenu label={item.name} key={item.name}>
                        {item.sub.map(itemSub => (
                          <MenuItem value={item._id} key={itemSub.name}>
                            {itemSub.name}
                          </MenuItem>
                        ))}
                      </SubMenu>
                    )
                  return (
                    <MenuItem value={item._id} key={item.name}>
                      {item.name}
                    </MenuItem>
                  )
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
                    <MenuRadioGroup value={sortByState} onRadioChange={e => handleSort(e.value)}>
                      <MenuItem value={SORT_KEYS.TIME_DESC}>
                        End Time (
                        <Icon className="material-icons-round font-bold">arrow_downward</Icon>)
                      </MenuItem>
                      <MenuItem value={SORT_KEYS.PRICE_ASC}>
                        Price (<Icon className="material-icons-round font-bold">arrow_upward</Icon>)
                      </MenuItem>
                    </MenuRadioGroup>
                  </Menu>
                </SuiBox>
              </>
            </SuiBox>
          </SuiBox>
          <SuiBox p={2} style={{minHeight: 'calc(100vh - 300px)'}}>
            {_renderData()}

            <SuiBox mt={2}>
              <SuiPagination variant="contained">
                <TablePagination
                  page={page}
                  totalPage={Math.ceil(
                    listBiddingProducts.length === 0
                      ? 1
                      : listBiddingProducts.length / LIMIT_PAGINATION
                  )}
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
