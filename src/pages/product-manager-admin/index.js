/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {TableCell, IconButton} from '@material-ui/core'
import {MoreVert} from '@material-ui/icons'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import {MenuContainer} from '../../assets/styled/MenuAction'

import SuiBox from '../../components/SuiBox'
import MenuAction from '../../components/MenuAction'
import TableContainer from '../../components/TableContainer'
import TablePagination from '../../components/TablePagination'

import {renderAction} from './utils/moreAction'
import TableHeader from './utils/tableHead'
import {ROUTER_DEFAULT} from '../../constants/router'
import {requestProductsData} from 'redux/actions/product'
import {openAlert} from 'redux/actions/alert'
import ProductJsonApi from 'apis/products/productJson'

const LIMIT_PAGINATION = 10

function ProductAdminManager() {
  const navigate = useHistory()
  const dispatch = useDispatch()

  const {listProducts} = useSelector(state => state.productState)

  const [list, setList] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setList(listProducts)
  }, [listProducts])

  const requestProducts = () => {
    dispatch(requestProductsData())
  }

  useEffect(() => {
    requestProducts()
  }, [])

  const handleResult = (data, status, error) => {
    if (error) {
      const infoNotify = {messageAlert: error, typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
    if (status === 200) {
      const infoNotify = {messageAlert: data.message || 'success', typeAlert: 'success'}
      dispatch(openAlert(infoNotify))
      requestProducts()
    }
    if (status && status !== 200) {
      const infoNotify = {messageAlert: data.message || 'Something wrong', typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
  }

  const handleDetail = () => {
    navigate.push(`${ROUTER_DEFAULT.PRODUCT_MANAGER_SELLER_EDIT}/${selectedItem._id}`)
  }
  const handleDelete = async () => {
    const {data, status, error} = await ProductJsonApi.deleteDocument(selectedItem._id)
    handleResult(data, status, error)
  }

  const listActions = renderAction({
    onDetail: () => {
      setAnchorEl(null)
      handleDetail()
    },
    onDelete: () => {
      setAnchorEl(null)
      handleDelete()
    }
  })

  return (
    <>
      <DashboardLayout>
        <Header />
        <TableContainer
          data={list}
          header={TableHeader}
          searchKey="createBy.email"
          page={page}
          keyRender="_id"
          renderRow={row => (
            <>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.createBy?.email}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={e => {
                    setAnchorEl(e.currentTarget)
                    setSelectedItem(row)
                  }}
                >
                  <MoreVert />
                </IconButton>
              </TableCell>
            </>
          )}
        />
        <SuiBox mt={2}>
          <TablePagination
            page={page}
            totalPage={Math.ceil(list.length / LIMIT_PAGINATION)}
            onChangePage={setPage}
          />
        </SuiBox>
        <Footer />
      </DashboardLayout>
      <MenuContainer open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
        {anchorEl && <MenuAction listActions={listActions} />}
      </MenuContainer>
    </>
  )
}

export default ProductAdminManager
