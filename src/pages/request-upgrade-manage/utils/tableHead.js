import {TableHead, TableRow, TableCell} from '@material-ui/core'

const categoryColumn = [
  {label: 'User', stateValue: 'user', align: 'left'},
  {label: 'Description', stateValue: 'description', align: 'left'},
  {label: '', stateValue: 'action', align: 'right'}
]

const TableHeader = () => (
  <TableHead style={{display: 'contents'}}>
    <TableRow style={{background: 'rgb(33, 212, 253)'}}>
      {categoryColumn.map(item => (
        <TableCell style={{color: '#fff'}} key={item.stateValue} align={item.align}>
          {item.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
)

export default TableHeader
