import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'

import {Dialog, Select, IconButton, MenuItem} from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'

import CloseIcon from '@material-ui/icons/Close'

import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import SuiTypography from 'components/SuiTypography'

import UserApi from 'apis/user'

import {ARRAY_STATUS_USER, ARRAY_ROLE_USER} from './constants'

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

export default function ModalUser({show, onClose, selectedItem, onSuccess}) {
  const dispatch = useDispatch()
  const [formValue, setFormValue] = useState({})

  useEffect(() => {
    setFormValue(selectedItem)
  }, [selectedItem])

  const handleChangeFormValue = key => e => {
    setFormValue({...formValue, [key]: e.target.value})
  }

  const handleResult = (data, status, error) => {
    if (error) {
      const infoNotify = {messageAlert: error, typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
    if (status === 200) {
      const infoNotify = {messageAlert: data.message || 'success', typeAlert: 'success'}
      dispatch(openAlert(infoNotify))
      onSuccess()
    }
    if (status && status !== 200) {
      const infoNotify = {messageAlert: data.message || 'Something wrong', typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
  }

  const handleSubmit = async () => {
    const {data, status, error} = await UserApi.updateUsersByAdmin(selectedItem._id, formValue)
    handleResult(data, status, error)
  }
  return (
    <div>
      <Dialog onClose={onClose} aria-labelledby="category-dialog" open={show} fullWidth>
        <DialogTitle id="category-dialog" onClose={onClose}>
          {`Edit user id ${selectedItem._id}`}
        </DialogTitle>
        <DialogContent dividers>
          <SuiBox ml={1}>
            <SuiTypography fontWeight="medium" variant="h6">
              Role
            </SuiTypography>
          </SuiBox>
          <Select
            value={formValue.role}
            onChange={handleChangeFormValue('role')}
            input={<SuiInput />}
          >
            {ARRAY_ROLE_USER.map(role => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
          <SuiBox ml={1}>
            <SuiTypography fontWeight="medium" variant="h6">
              Status
            </SuiTypography>
          </SuiBox>
          <Select
            value={formValue.status}
            onChange={handleChangeFormValue('status')}
            input={<SuiInput />}
          >
            {ARRAY_STATUS_USER.map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <SuiButton onClick={onClose} buttonColor="secondary" variant="text">
            Cancel
          </SuiButton>
          <SuiButton onClick={handleSubmit} buttonColor="info" variant="outlined">
            Save
          </SuiButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
