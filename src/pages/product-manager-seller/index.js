import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import {Grid, Card, Icon} from '@material-ui/core'

import SuiBox from 'components/SuiBox'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import SuiButton from 'components/SuiButton'
import SuiPagination from '../../components/SuiPagination/index'
import SuiInput from '../../components/SuiInput/index'

import {Menu, MenuItem, SubMenu} from '@szhsin/react-menu'

import TablePagination from '../../components/TablePagination/index'
import ProductCard from './components/ProductCard/index'

import {requestCategoryData} from 'redux/actions/category'
import {requestSubCategoryData} from 'redux/actions/subcategory'

import filter from 'lodash/filter'
import includes from 'lodash/includes'

import {ROUTER_DEFAULT} from 'constants/router'

import products from './fakeData'

const LIMIT_PAGINATION = 12

function ProductManagerSeller() {
  const dispatch = useDispatch()
  const navigate = useHistory()

  const {dataCategory} = useSelector(state => state.categoryState)
  const {dataSubCategory} = useSelector(state => state.subCategoryState)

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dataCategory.length === 0 && dispatch(requestCategoryData())
    dataSubCategory.length === 0 && dispatch(requestSubCategoryData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCategory, dataSubCategory])

  const handleAddNew = () => {
    navigate.push(ROUTER_DEFAULT.PRODUCT_MANAGER_SELLER_NEW)
  }

  const filterProduct = products => {
    if (!!search) {
      const filteredData = filter(products, item =>
        includes(item.name.toString().toLowerCase(), search.toLowerCase())
      )
      return filteredData
    }
    return products
  }

  const _renderData = () => {
    return (
      <Grid container spacing={3}>
        {filterProduct(products)
          .slice((page - 1) * LIMIT_PAGINATION, (page - 1) * LIMIT_PAGINATION + LIMIT_PAGINATION)
          .map(({_id, name, subCategory, image}) => (
            <Grid item xs={12} md={6} xl={3} key={_id}>
              <ProductCard
                name={name}
                subCategory={subCategory}
                image={image}
                url={`${ROUTER_DEFAULT.PRODUCT_MANAGER_SELLER_EDIT}/${_id}`}
              />
            </Grid>
          ))}
      </Grid>
    )
  }

  const MenuButtonCategory = (
    <SuiButton variant="gradient" buttonColor="warning" endIcon={<Icon>keyboard_arrow_down</Icon>}>
      Category
    </SuiButton>
  )

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mb={3}>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" pt={2} px={2}>
            <SuiBox mb={0.5} display="flex" alignItems="center">
              <Menu menuButton={MenuButtonCategory}>
                {dataCategory.map(category => {
                  if (dataSubCategory.find(subCategory => subCategory.category === category._id))
                    return (
                      <SubMenu label={category.name} key={category._id}>
                        {dataSubCategory.map(item => (
                          <MenuItem key={item._id}>{item.name}</MenuItem>
                        ))}
                      </SubMenu>
                    )
                  return <MenuItem key={category._id}>{category.name}</MenuItem>
                })}
              </Menu>
            </SuiBox>
            <SuiBox display="flex" mb={1}>
              <SuiBox mr={1}>
                <SuiInput
                  withIcon={{icon: 'search', direction: 'right'}}
                  placeholder="Search name"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </SuiBox>

              <SuiBox mr={1}>
                <SuiButton
                  variant="gradient"
                  buttonColor="info"
                  startIcon={<Icon>add</Icon>}
                  onClick={handleAddNew}
                >
                  New
                </SuiButton>
              </SuiBox>
            </SuiBox>
          </SuiBox>
          <SuiBox p={2}>
            {_renderData()}
            <SuiBox mt={2}>
              <SuiPagination variant="contained">
                <TablePagination
                  page={page}
                  totalPage={Math.ceil(products.length / LIMIT_PAGINATION)}
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

export default ProductManagerSeller
