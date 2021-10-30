import {TableHead, TableRow, TableCell} from '@material-ui/core'

const userColumn = [
  {label: 'Username', stateValue: 'username', align: 'left'},
  {label: 'Email', stateValue: 'email', align: 'left'},
  {label: 'Role', stateValue: 'role', align: 'center'},
  {label: 'Status', stateValue: 'status', align: 'center'},
  {label: '', stateValue: 'action', align: 'right'}
]

const TableHeader = () => (
  <TableHead style={{display: 'contents'}}>
    <TableRow style={{background: 'rgb(33, 212, 253)'}}>
      {userColumn.map(item => (
        <TableCell style={{color: '#fff'}} key={item.stateValue} align={item.align}>
          {item.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
)

export default TableHeader
