import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import SuiBox from 'components/SuiBox'
import {IconButton} from '@material-ui/core'
import {Visibility} from '@material-ui/icons'
import SuiTypography from 'components/SuiTypography'
import styles from './styles'
import Table from 'component-pages/Table'
import get from 'lodash/get'
import Document from 'component-pages/Icons/Document'
import TablePagination from '../../../components/TablePagination/index'
import {useState, useMemo} from 'react'
import {getButtonByStatus} from '../../../helpers/getButtonByStatus'
import {ROUTER_DEFAULT} from 'constants/router'

const LIMIT_PAGINATION = 10

const columns = [
  {key: 'name', align: 'left', name: 'Name'},
  {key: 'price', align: 'left', name: 'Price ($)'},
  {key: 'status', align: 'left', name: 'Status'},
  {key: 'action', align: 'center', name: 'Detail'}
]

const HistoryBidder = () => {
  const classes = styles()
  const navigate = useHistory()

  const {listBiddingProductsHasSold} = useSelector(state => state.biddingProductState)

  const {profile} = useSelector(state => state.userState)

  const list = useMemo(
    () => listBiddingProductsHasSold.filter(element => get(element, 'winner._id') === profile._id),
    [listBiddingProductsHasSold, profile._id]
  )

  const [page, setPage] = useState(1)

  const rows = list
    .slice((page - 1) * LIMIT_PAGINATION, (page - 1) * LIMIT_PAGINATION + LIMIT_PAGINATION)
    .map(history => {
      return {
        name: [<Document size="12px" />, get(history, 'product.name')],
        status: getButtonByStatus(history.status),
        price: history.currentPrice,
        action: (
          <IconButton
            onClick={() =>
              navigate.push(`${ROUTER_DEFAULT.PRODUCT_DETAIL}/${(get(history, 'product._id'), '')}`)
            }
          >
            <Visibility />
          </IconButton>
        )
      }
    })

  return (
    <>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SuiTypography variant="h6">History win</SuiTypography>
      </SuiBox>
      <SuiBox customClass={classes.tables_table}>
        <Table columns={columns} rows={rows} />
        <SuiBox mt={2}>
          <TablePagination
            page={page}
            totalPage={Math.ceil(rows.length === 0 ? 1 : rows.length / LIMIT_PAGINATION)}
            onChangePage={setPage}
          />
        </SuiBox>
      </SuiBox>
    </>
  )
}

export default HistoryBidder
