import {useSelector, useDispatch} from 'react-redux'
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer
} from '@material-ui/core'
import dayjs from 'dayjs'
import get from 'lodash/get'
import {hide} from 'helpers/string'
import BiddingProductApi from 'apis/bidding-product/apiObject'
import {openAlert} from 'redux/actions/alert'
import SuiButton from 'components/SuiButton'

export default function BasicTable({value, product, biddingProduct}) {
  const dispatch = useDispatch()
  const {profile} = useSelector(state => state.userState)
  const isOwner = get(profile, '_id', '') === get(product, 'createBy._id', '')

  const handleBanUSer = async id => {
    const {data, status, error} = await BiddingProductApi.blockUserBid(biddingProduct._id, {
      userIds: id
    })
    error && dispatch(openAlert({messageAlert: error, typeAlert: 'error'}))
    status === 200 && dispatch(openAlert({messageAlert: data.message, typeAlert: 'success'}))
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{display: 'contents'}}>
          <TableRow>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">User</TableCell>
            <TableCell align="left">Price&nbsp;($)</TableCell>
            {isOwner && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {(value || []).map(row => (
            <TableRow key={row._id}>
              <TableCell align="left">
                {dayjs(row.createAt).format('DD/MM/YYYY HH:mm:ss')}
              </TableCell>
              <TableCell align="left">
                {!isOwner ? hide(get(row, 'user.fullName', '')) : get(row, 'user.fullName', '')}
              </TableCell>
              <TableCell align="left">{row.biddingPrice}</TableCell>
              {isOwner && (
                <TableCell align="right">
                  <SuiButton
                    variant="outlined"
                    buttonColor="error"
                    onClick={() => {
                      handleBanUSer(get(row, 'user._id') ? [get(row, 'user._id')] : [])
                    }}
                  >
                    Ban
                  </SuiButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
