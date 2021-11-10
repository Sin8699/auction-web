import React, {useState} from 'react'
import {useDispatch} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'

import {Dialog, IconButton} from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'

import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import SuiTypography from 'components/SuiTypography'
import RequestUpgradeApi from 'apis/request-upgrade'
import {openAlert} from 'redux/actions/alert'

const styles = theme => ({
  root: {margin: 0, padding: theme.spacing(2)},
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <SuiTypography variant="h6">{children}</SuiTypography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {padding: theme.spacing(2)}
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {margin: 0, padding: theme.spacing(1)}
}))(MuiDialogActions)

export default function ModalRequestUpgrade({show, onClose}) {
  const dispatch = useDispatch()
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)

  const handleResult = (data, status, error) => {
    if (error) {
      const infoNotify = {messageAlert: error, typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
    if (status === 200) {
      const infoNotify = {messageAlert: data.message || 'success', typeAlert: 'success'}
      dispatch(openAlert(infoNotify))
      onClose()
    }
    if (status && status !== 200) {
      const infoNotify = {messageAlert: data.message || 'Something wrong', typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
  }

  const handleSubmit = async () => {
    if (!description) {
      setError(true)
      return
    }
    const {data, status, error} = await RequestUpgradeApi.createDocument({description})
    handleResult(data, status, error)
  }

  return (
    <div>
      <Dialog onClose={onClose} aria-labelledby="category-dialog" open={show} fullWidth>
        <DialogTitle id="category-dialog" onClose={onClose}>
          Request upgrade account SELLER
        </DialogTitle>
        <DialogContent dividers>
          <SuiBox ml={1}>
            <SuiTypography fontWeight="medium" variant="h6">
              Describe the your request
            </SuiTypography>
          </SuiBox>
          <SuiInput
            fullWidth
            size="large"
            multiline
            maxRows={5}
            minRows={5}
            value={description}
            onChange={e => {
              setDescription(e.target.value)
              setError(false)
            }}
            error={error}
          />
        </DialogContent>
        <DialogActions>
          <SuiButton onClick={onClose} buttonColor="secondary" variant="text">
            Cancel
          </SuiButton>
          <SuiButton onClick={handleSubmit} buttonColor="info" variant="outlined">
            Send
          </SuiButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
