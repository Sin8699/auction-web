import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'

import {Dialog, IconButton, Select, MenuItem} from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'

import CloseIcon from '@material-ui/icons/Close'

import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import SuiTypography from 'components/SuiTypography'

import SubCategoryApi from 'apis/sub-categories'

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

export default function ModalSubCategory({
  show,
  onClose,
  selectedItem,
  categories = [],
  onSuccess,
  typeModal
}) {
  const dispatch = useDispatch()
  const [formValue, setFormValue] = useState({name: '', category: ''})
  console.log('formValue: ', formValue)
  const [errors, setErrors] = useState({name: false, category: false})

  useEffect(() => {
    typeModal === TYPE_MODAL.EDIT && setFormValue(selectedItem)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeModal])

  const handleChangeForm = key => e => {
    setErrors({...errors, [key]: false})
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

  const validateForm = () => {
    const nameError = !formValue.name
    const categoryError = !formValue.category
    return {nameError, categoryError}
  }

  const handleSubmit = async () => {
    const {nameError, categoryError} = validateForm()
    if (nameError || categoryError) {
      setErrors({name: nameError, category: categoryError})
      return
    }
    if (typeModal === TYPE_MODAL.CREATE) {
      const {data, status, error} = await SubCategoryApi.createDocument(formValue)
      handleResult(data, status, error)
    } else {
      const {data, status, error} = await SubCategoryApi.updateDocument(formValue, selectedItem._id)
      handleResult(data, status, error)
    }
  }

  return (
    <div>
      <Dialog onClose={onClose} aria-labelledby="category-dialog" open={show} fullWidth>
        <DialogTitle id="category-dialog" onClose={onClose}>
          {typeModal === TYPE_MODAL.CREATE && 'New subcategory'}
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
            size="large"
            value={formValue.name || ''}
            onChange={handleChangeForm('name')}
            error={errors.name}
          />
          <SuiBox ml={1} mt={2}>
            <SuiTypography fontWeight="medium" variant="h6">
              Category
            </SuiTypography>
          </SuiBox>
          <Select
            value={formValue.category}
            onChange={handleChangeForm('category')}
            input={<SuiInput error={errors.category} />}
          >
            {categories.map(category => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
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
