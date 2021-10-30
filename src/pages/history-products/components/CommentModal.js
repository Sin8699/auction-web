import SuiBox from '../../../components/SuiBox/index'
import { Icon } from '@material-ui/core'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import Tooltip from '@material-ui/core/Tooltip'

export default function CommentModal({ id }) {
  const [message, setMessage] = useState()
  console.log('message', message)

  const [open, setOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(true)

  const handleOpenDialog = (v) => () => {
    if (v) {
      setOpen(v)
    } else setOpen((prev) => !prev)
  }
  const handleLiked = () => {
    setIsChecked((prev) => !prev)
  }

  return (
    <div>
      <SuiBox mx={3} onClick={handleOpenDialog()}>
        <Tooltip title="Review product" placement="top">
          <Icon classsName="material-icons-round">lightbulb</Icon>
        </Tooltip>
      </SuiBox>
      <Dialog
        fullWidth
        open={open}
        onClose={handleOpenDialog()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Review Product</DialogTitle>
        <DialogContent>
          <TextField
            color="secondary"
            autoFocus
            id="message"
            label="Message"
            type="text"
            fullWidth
            onChange={(v) => setMessage(v.target.value)}
          />

          <SuiBox mt={2}>
            {isChecked ? (
              <ThumbUpIcon onClick={handleLiked} />
            ) : (
              <ThumbDownIcon onClick={handleLiked} />
            )}
          </SuiBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOpenDialog(false)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
