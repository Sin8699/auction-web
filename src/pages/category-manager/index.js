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

import {ROUTER_DEFAULT} from '../../constants/router'

import {categoriesData} from './mockData'

const LIMIT_PAGINATION = 10

function CategoryManager() {
  const navigate = useHistory()

  const [list, setList] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setList(categoriesData)
  }, [])

  const onNew = () => navigate.push(ROUTER_DEFAULT.CATEGORY_MANAGER_NEW)

  const handleEdit = () => {
    navigate.push(`${ROUTER_DEFAULT.CATEGORY_MANAGER_EDIT}/${selectedItem.id}`)
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

export default CategoryManager
