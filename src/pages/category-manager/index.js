import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {TableCell, IconButton} from '@material-ui/core'
import {MoreVert} from '@material-ui/icons'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import SuiBox from 'components/SuiBox'

import {MenuContainer} from '../../assets/styled/MenuAction'

import MenuAction from '../../components/MenuAction'
import TableContainer from '../../components/TableContainer'
import TablePagination from '../../components/TablePagination'

import {renderAction} from './utils/moreAction'
import TableHeader from './utils/tableHead'
import {TYPE_MODAL} from 'constants/modal'
import ModalCategory from './components/modal'

import {requestCategoryData} from '../../redux/actions/category'

const LIMIT_PAGINATION = 10

function CategoryManager() {
  const dispatch = useDispatch()
  const {dataCategory} = useSelector(state => state.categoryState)

  const [list, setList] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [typeModal, setTypeModal] = useState()
  const [page, setPage] = useState(1)

  const onSuccessCategory = () => {
    setShowModal(false)
    dispatch(requestCategoryData())
  }

  useEffect(() => dispatch(requestCategoryData()), [dispatch])

  const onAddNew = () => {
    setShowModal(true)
    setTypeModal(TYPE_MODAL.CREATE)
  }

  useEffect(() => {
    setList(dataCategory)
  }, [dataCategory])

  const listActions = renderAction({
    onEdit: () => {
      setShowModal(true)
      setTypeModal(TYPE_MODAL.EDIT)
      setAnchorEl(null)
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
          onAddNew={onAddNew}
          searchKey="name"
          page={page}
          keyRender="_id"
          renderRow={row => (
            <>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.name}</TableCell>
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
      {showModal && (
        <ModalCategory
          show={showModal}
          onClose={() => setShowModal(false)}
          selectedItem={selectedItem}
          onSuccess={onSuccessCategory}
          typeModal={typeModal}
        />
      )}
    </>
  )
}

export default CategoryManager
