import {useState} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Document from '../../../../component-pages/Icons/Document'
import SuiBox from 'components/SuiBox'
import SuiButton from '../../../../components/SuiButton/index'
import Table from 'component-pages/Table'

const historyProductData = [
  {
    id: 1,
    endTime: new Date().toDateString(),
    name: 'bidding 1',
    status: 'SOLD',
    product: 11,
    currentPrice: '10',
    image: 'http://placeimg.com/640/480/city'
  },
  {
    id: 2,
    endTime: new Date().toDateString(),
    name: 'bidding 2',
    status: 'SOLD',
    product: 34,
    currentPrice: '10',
    image: 'http://placeimg.com/640/480/city'
  }
]

const data = {
  columns: [
    {key: 'name', align: 'left', name: 'Name'},
    {key: 'endTime', align: 'left', name: 'End Time'},
    {key: 'status', align: 'left', name: 'Status'}
  ]
}

export default function BiddingHistoryModal({id}) {
  const {columns} = data

  const [open, setOpen] = useState(false)

  const handleOpenDialog = v => () => {
    if (v) {
      setOpen(v)
    } else setOpen(prev => !prev)
  }

  const rows = historyProductData.map(history => {
    let statusComp = history.status

    switch (history.status) {
      case 'SOLD':
        statusComp = (
          <SuiButton
            size="small"
            style={{color: 'rgb(189, 0, 0)', backgroundColor: 'rgb(252, 151, 151)'}}
          >
            SOLD
          </SuiButton>
        )
        break
      case 'AVAILABLE':
        statusComp = (
          <SuiButton
            size="small"
            style={{background: 'rgb(205, 245, 155)', color: 'rgb(103, 177, 8)'}}
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
    <div>
      <SuiBox mx={3} onClick={handleOpenDialog()}>
        <Document size="12px" />
      </SuiBox>
      <Dialog
        fullWidth
        open={open}
        onClose={handleOpenDialog()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Bidding History</DialogTitle>
        <DialogContent>
          <Table columns={columns} rows={rows} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
