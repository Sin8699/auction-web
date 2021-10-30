// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import { Menu, MenuItem } from '@szhsin/react-menu'
// Images
import styles from './styles'
import Card from '@material-ui/core/Card'
import Table from 'component-pages/Table'
import SuiButton from 'components/SuiButton'
import Icon from '@material-ui/core/Icon'
import { historyProductData } from '../fakeData'
import Document from 'component-pages/Icons/Document'
import TablePagination from '../../../components/TablePagination/index'
import { useState, useMemo } from 'react'
import chunk from 'lodash/chunk'

const LIMIT_PAGINATION = 10

const data = {
  columns: [
    { key: 'name', align: 'left', name: 'Name' },
    { key: 'currentPrice', align: 'left', name: 'Current Price ($)' },
    { key: 'product', align: 'left', name: 'Product' },
    { key: 'endTime', align: 'left', name: 'End Time' },
    { key: 'status', align: 'left', name: 'Status' }
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
    let statusComp = history.status

    switch (history.status) {
      case 'SOLD':
        statusComp = (
          <SuiButton
            size="small"
            style={{ color: 'rgb(189, 0, 0)', backgroundColor: 'rgb(252, 151, 151)' }}
          >
            SOLD
          </SuiButton>
        )
        break
      case 'AVAILABLE':
        statusComp = (
          <SuiButton
            size="small"
            style={{ background: 'rgb(205, 245, 155)', color: 'rgb(103, 177, 8)' }}
          >
            AVAILABLE
          </SuiButton>
        )
        break

      default:
        statusComp = (
          <SuiButton size="small" variant="gradient" buttonColor="dark">
            EXPIRED
          </SuiButton>
        )
        break
    }

    return {
      ...history,
      name: [<Document size="12px" />, history.name],
      status: statusComp
    }
  })

  return (
    <Card>
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
        <TablePagination
          page={page}
          totalPage={Math.ceil(list.length / LIMIT_PAGINATION)}
          onChangePage={setPage}
        />
      </SuiBox>
    </Card>
  )
}

export default ProductTableData
