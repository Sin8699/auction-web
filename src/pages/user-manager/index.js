/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {TableCell, IconButton, Tooltip} from '@material-ui/core'
import {Edit} from '@material-ui/icons'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import SuiBox from 'components/SuiBox'
import SuiBadge from 'components/SuiBadge'
import TableContainer from 'components/TableContainer'
import TablePagination from 'components/TablePagination'

import ModalUser from './utils/modal'

import TableHeader from './utils/tableHead'

import {requestUsersByAdmin} from 'redux/actions/user'

const LIMIT_PAGINATION = 10

function UserManager() {
  const dispatch = useDispatch()
  const {listUserForAdmin} = useSelector(state => state.userState)

  const [page, setPage] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [selectedItem, setSelectItem] = useState()

  const onSuccessAction = () => {
    dispatch(requestUsersByAdmin())
    setOpenModal(false)
  }

  useEffect(() => {
    onSuccessAction()
  }, [])

  const handleEdit = itemSelected => {
    setSelectItem(itemSelected)
    setOpenModal(true)
  }

  return (
    <>
      <DashboardLayout>
        <Header />
        <TableContainer
          data={listUserForAdmin}
          header={TableHeader}
          searchKey="email"
          page={page}
          keyRender="_id"
          renderRow={row => (
            <>
              <TableCell>{row.fullName}</TableCell>
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
                  color={
                    row.status === 'VERIFIED'
                      ? 'success'
                      : row.status === 'NOT_VERIFIED'
                      ? 'warning'
                      : 'error'
                  }
                  size="medium"
                />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit" placement="left">
                  <IconButton onClick={() => handleEdit(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </>
          )}
        />
        <SuiBox mt={2}>
          <TablePagination
            page={page}
            totalPage={Math.ceil(listUserForAdmin.length / LIMIT_PAGINATION)}
            onChangePage={setPage}
          />
        </SuiBox>
        <Footer />
      </DashboardLayout>
      {openModal && (
        <ModalUser
          show={openModal}
          onClose={() => setOpenModal(false)}
          selectedItem={selectedItem}
          onSuccess={onSuccessAction}
        />
      )}
    </>
  )
}

export default UserManager
