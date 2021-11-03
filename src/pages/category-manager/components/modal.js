import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close'

import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import SuiTypography from 'components/SuiTypography'

import CategoryApi from 'apis/categories'

import {TYPE_MODAL} from 'constants/modal'

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

export default function ModalCategory({show, onClose, selectedItem, onSuccess, typeModal}) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [errors, setError] = useState({})

  useEffect(() => {
    typeModal === TYPE_MODAL.EDIT && setName(selectedItem.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeModal])

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
    if (!name) {
      setError({...errors, name: true})
      return
    }
    const dateReq = {name: name}
    if (typeModal === TYPE_MODAL.CREATE) {
      const {data, status, error} = await CategoryApi.createDocument(dateReq)
      handleResult(data, status, error)
    } else {
      const {data, status, error} = await CategoryApi.updateDocument(dateReq, selectedItem._id)
      handleResult(data, status, error)
    }
  }
  return (
    <div>
      <Dialog onClose={onClose} aria-labelledby="category-dialog" open={show} fullWidth>
        <DialogTitle id="category-dialog" onClose={onClose}>
          {typeModal === TYPE_MODAL.CREATE && 'New category'}
          {typeModal === TYPE_MODAL.EDIT && `Edit category id ${selectedItem._id}`}
        </DialogTitle>
        <DialogContent dividers>
          <SuiBox ml={1}>
            <SuiTypography fontWeight="medium" variant="h6">
              Name
            </SuiTypography>
          </SuiBox>
          <SuiInput
            fullWidth
            placeholder="Name"
            size="large"
            value={name}
            onChange={e => {
              setName(e.target.value)
              setError({...errors, name: false})
            }}
            error={!!errors.name}
          />
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
