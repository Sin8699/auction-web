import React, {useState, useEffect} from 'react'
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

import {categoriesData} from './mockData'

function CategoryManager() {
  const [list, setList] = useState(categoriesData)
  const [selectedItem, setSelectedItem] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)

  const [totalPage, setTotalPage] = useState()
  useEffect(() => {
    setTotalPage(Math.floor(list.length / 10) + 1)
  }, [list])

  const onNew = () => {}

  const handleEdit = () => {
    console.log('selectedItem: ', selectedItem)
  }

  const listActions = renderAction({
    onEdit: () => {
      setAnchorEl(null)
      handleEdit()
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
          onAddNew={onNew}
          searchKey="name"
          page={page}
          renderRow={row => (
            <>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">
                <SuiBadge
                  variant="gradient"
                  badgeContent={row.status}
                  color={row.status === 'open' ? 'success' : 'secondary'}
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
          <TablePagination page={page} totalPage={totalPage} onChangePage={setPage} />
        </CoverLayout>
        <Footer />
      </DashboardLayout>
      <MenuContainer open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
        {anchorEl && <MenuAction listActions={listActions} />}
      </MenuContainer>
    </>
  )
}

export default CategoryManager
