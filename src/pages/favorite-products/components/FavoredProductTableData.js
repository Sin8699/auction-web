import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import dayjs from 'dayjs'

import {Card, IconButton} from '@material-ui/core'
import {Visibility} from '@material-ui/icons'

import Table from 'component-pages/Table'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import styles from './styles'

import {getProductsFavored} from '../../../helpers/favoredProduct'

import {ROUTER_DEFAULT} from 'constants/router'

const data = {
  columns: [
    {name: 'product', align: 'left', key: 'product'},
    {name: 'Public Date', align: 'left', key: 'publicDay'},
    {name: 'Detail', align: 'center', key: 'action'}
  ]
}

const FavoredProductTableData = () => {
  const classes = styles()
  const navigate = useHistory()

  const {listProducts, loadingListProduct} = useSelector(state => state.productState)
  console.log('listProducts: ', listProducts)

  const idFavoredList = getProductsFavored()

  const rows = listProducts
    .filter(p => (idFavoredList || []).includes(p._id))
    .map(product => {
      return {
        product: [`http://${product.imageUrl}`, product.name],
        publicDay: (
          <SuiTypography variant="caption" textColor="text" fontWeight="medium">
            {dayjs(product.createAt).format('DD/MM/YYYY')}
          </SuiTypography>
        ),
        action: (
          <IconButton
            onClick={() => navigate.push(`${ROUTER_DEFAULT.PRODUCT_DETAIL}/${product._id}`)}
          >
            <Visibility />
          </IconButton>
        )
      }
    })

  const {columns} = data

  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SuiTypography variant="h6">Favorite Products</SuiTypography>
      </SuiBox>
      {loadingListProduct ? (
        'Loading...'
      ) : (
        <SuiBox customClass={classes.tables_table}>
          <Table columns={columns} rows={rows} />
        </SuiBox>
      )}
    </Card>
  )
}

export default FavoredProductTableData
