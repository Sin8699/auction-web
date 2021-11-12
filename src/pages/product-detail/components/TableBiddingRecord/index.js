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

export default function BasicTable({value}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{display: 'contents'}}>
          <TableRow>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">User</TableCell>
            <TableCell align="left">Price&nbsp;($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(value || []).map(row => (
            <TableRow key={row._id}>
              <TableCell align="left">{dayjs(row.createAt).format('DD/MM/YYYY')}</TableCell>
              <TableCell align="left">{hide(get(row, 'user.fullName'))}</TableCell>
              <TableCell align="left">{row.biddingPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
