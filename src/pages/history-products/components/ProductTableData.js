// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import { Menu, MenuItem } from '@szhsin/react-menu'
// Images
import styles from './styles'
import Table from 'component-pages/Table'
import SuiButton from 'components/SuiButton'
import Icon from '@material-ui/core/Icon'
import { historyProductData } from '../fakeData'
import Document from 'component-pages/Icons/Document'
import TablePagination from '../../../components/TablePagination/index'
import { useState, useMemo } from 'react'
import chunk from 'lodash/chunk'
import CommentModal from './CommentModal'
import { getButtonByStatus } from '../../../helpers/getButtonByStatus'

const LIMIT_PAGINATION = 10

const data = {
  columns: [
    { key: 'name', align: 'left', name: 'Name' },
    { key: 'currentPrice', align: 'left', name: 'Current Price ($)' },
    { key: 'product', align: 'left', name: 'Product' },
    { key: 'endTime', align: 'left', name: 'End Time' },
    { key: 'status', align: 'left', name: 'Status' },
    { key: 'cmt', align: 'right', name: '' }
  ]
}

const ProductTableData = () => {
  const classes = styles()

  const { columns } = data
  const list = useMemo(() => historyProductData, [])

  const [page, setPage] = useState(1)

  const chuckList = useMemo(() => chunk(list, LIMIT_PAGINATION), [list])
  const listByPage = chuckList[page]

  const rows = listByPage.map((history) => {
    let statusComp = getButtonByStatus(history.status)

    return {
      ...history,
      name: [<Document size="12px" />, history.name],
      status: statusComp,
      cmt: <CommentModal id={history.id} />
    }
  })

  return (
    <>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SuiTypography variant="h6">History Products</SuiTypography>
        <SuiBox display="flex" mb={1}>
          <Menu
            menuButton={
              <SuiButton variant="gradient" buttonColor="warning">
                Filter By
                <Icon classkey="material-icons-round font-bold">keyboard_arrow_down</Icon>
              </SuiButton>
            }
          >
            <MenuItem>All</MenuItem>
            <MenuItem>Auctioned</MenuItem>
            <MenuItem>Won</MenuItem>
          </Menu>
        </SuiBox>
      </SuiBox>
      <SuiBox customClass={classes.tables_table}>
        <Table columns={columns} rows={rows} />
        <SuiBox mt={2}>
          <TablePagination
            page={page}
            totalPage={Math.ceil(list.length / LIMIT_PAGINATION) - 1}
            onChangePage={setPage}
          />
        </SuiBox>
      </SuiBox>
    </>
  )
}

export default ProductTableData
