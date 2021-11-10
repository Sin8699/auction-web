/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import get from 'lodash/get'

import {TableCell, IconButton} from '@material-ui/core'
import {Visibility} from '@material-ui/icons'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import SuiBox from 'components/SuiBox'

import TableContainer from '../../components/TableContainer'
import TablePagination from '../../components/TablePagination'

import TableHeader from './utils/tableHead'

import ModalRequestUpgradeAdmin from './components/modal'

import {openAlert} from 'redux/actions/alert'

import RequestUpgradeApi from 'apis/request-upgrade'

const LIMIT_PAGINATION = 10

function RequesUpgradeManager() {
  const dispatch = useDispatch()

  const [list, setList] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [showModal, setShowModal] = useState(false)

  const [page, setPage] = useState(1)

  const handleResult = (data, status, error) => {
    if (error) {
      const infoNotify = {messageAlert: error, typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
    if (status === 200) {
      const infoNotify = {messageAlert: data.message || 'success', typeAlert: 'success'}
      dispatch(openAlert(infoNotify))
      setList(data)
    }
    if (status && status !== 200) {
      const infoNotify = {messageAlert: data.message || 'Something wrong', typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
  }

  const requestData = async () => {
    const {data, status, error} = await RequestUpgradeApi.getDocuments()
    handleResult(data, status, error)
  }

  useEffect(() => requestData(), [])

  const handleEdit = itemSelected => {
    setSelectedItem(itemSelected)
    setShowModal(true)
  }

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
              <TableCell>{get(row, 'createBy.email')}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEdit(row)}>
                  <Visibility />
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

      {showModal && (
        <ModalRequestUpgradeAdmin
          show={showModal}
          onClose={() => setShowModal(false)}
          selectedItem={selectedItem}
        />
      )}
    </>
  )
}

export default RequesUpgradeManager
