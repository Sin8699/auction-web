import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {TableCell, IconButton} from '@material-ui/core'
import {MoreVert} from '@material-ui/icons'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import CoverLayout from '../../assets/styled/CoverLayout'
import {MenuContainer} from '../../assets/styled/MenuAction'

import SuiBadge from '../../components/SuiBadge'
import MenuAction from '../../components/MenuAction'
import TableContainer from '../../components/TableContainer'
import TablePagination from '../../components/TablePagination'

import {renderAction} from './utils/moreAction'
import TableHeader from './utils/tableHead'
// import {ROUTER_DEFAULT} from '../../constants/router'

import {productData} from './mockData'

const LIMIT_PAGINATION = 10

function ProductAdminManager() {
  const navigate = useHistory()

  const [list, setList] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  console.log('selectedItem: ', selectedItem)
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    console.log('productData: ', productData)
    setList(productData)
  }, [])

  const handleDetail = () => {
    navigate.push(`/`)
  }

  const listActions = renderAction({
    onDetail: () => {
      setAnchorEl(null)
      handleDetail()
    },
    onDelete: () => {
      setAnchorEl(null)
    }
  })

  return (
    <>
      <DashboardLayout>
        <Header />
        <TableContainer
          data={list}
          header={TableHeader}
          searchKey="owner"
          page={page}
          renderRow={row => (
            <>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell align="center">
                <SuiBadge
                  variant="gradient"
                  badgeContent={row.status}
                  color={
                    row.status === 'SOLD'
                      ? 'dark'
                      : row.role === 'AVAILABLE'
                      ? 'info'
                      : row.role === 'EXPIRED'
                      ? 'error'
                      : 'primary'
                  }
                  size="medium"
                />
              </TableCell>

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
        <CoverLayout marginTop="10px">
          <TablePagination
            page={page}
            totalPage={Math.ceil(list.length / LIMIT_PAGINATION)}
            onChangePage={setPage}
          />
        </CoverLayout>
        <Footer />
      </DashboardLayout>
      <MenuContainer open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
        {anchorEl && <MenuAction listActions={listActions} />}
      </MenuContainer>
    </>
  )
}

export default ProductAdminManager
