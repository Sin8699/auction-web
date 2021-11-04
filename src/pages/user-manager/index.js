import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {TableCell, IconButton} from '@material-ui/core'
import {MoreVert} from '@material-ui/icons'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import {MenuContainer} from '../../assets/styled/MenuAction'

import SuiBox from '../../components/SuiBox'
import SuiBadge from '../../components/SuiBadge'
import MenuAction from '../../components/MenuAction'
import TableContainer from '../../components/TableContainer'
import TablePagination from '../../components/TablePagination'

import {renderAction} from './utils/moreAction'
import TableHeader from './utils/tableHead'
import {ROUTER_DEFAULT} from '../../constants/router'

import {userData} from './mockData'

const LIMIT_PAGINATION = 10

function UserManager() {
  const navigate = useHistory()

  const [list, setList] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setList(userData)
  }, [])

  const handleEdit = () => {
    navigate.push(`${ROUTER_DEFAULT.USER_MANAGER_EDIT}/${selectedItem.id}`)
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
          searchKey="email"
          page={page}
          renderRow={row => (
            <>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="center">
                <SuiBadge
                  variant="gradient"
                  badgeContent={row.role}
                  color={
                    row.role === 'ADMIN'
                      ? 'dark'
                      : row.role === 'BIDDER'
                      ? 'info'
                      : row.role === 'SELLER'
                      ? 'primary'
                      : 'primary'
                  }
                  size="medium"
                />
              </TableCell>
              <TableCell align="center">
                <SuiBadge
                  variant="gradient"
                  badgeContent={row.status}
                  color={'error'}
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

export default UserManager
