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

const data = {
  columns: [
    { key: 'name', align: 'left', name: 'Name' },
    { key: 'currentPrice', align: 'left', name: 'Current Price' },
    { key: 'status', align: 'left', name: 'Status' },
    { key: 'product', align: 'left', name: 'Product' },
    { key: 'endTime', align: 'left', name: 'End Time' }
  ]
}

const ProductTableData = () => {
  const classes = styles()

  const { columns } = data

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
        <Table columns={columns} rows={historyProductData} />
      </SuiBox>
    </Card>
  )
}

export default ProductTableData
