import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'

import {Dialog, IconButton, Select, MenuItem, Checkbox} from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'

import {Close, AttachMoney} from '@material-ui/icons'

import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import SuiTypography from 'components/SuiTypography'

import {openAlert} from 'redux/actions/alert'
import validateData, {TYPE_SCHEMA} from 'utils/validationSchema'
import BiddingProductApi from 'apis/bidding-product/apiObject'

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
          <Close />
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

export default function ModalNewBidding({show, onClose, onSuccess}) {
  const dispatch = useDispatch()
  const [formValue, setFormValue] = useState({})
  const [errors, setErrors] = useState({})

  const {listProducts} = useSelector(state => state.productState)

  const handleChangeValue = key => e => {
    setErrors({...errors, [key]: ''})
    let value
    switch (key) {
      case 'allowBuyNow':
        value = e.target.checked
        break
      default:
        value = e.target.value
    }
    setFormValue({...formValue, [key]: value})
  }

  const handleResult = (data, status, error) => {
    let infoNotify
    if (error) {
      infoNotify = {messageAlert: error, typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
    if (status === 200) {
      infoNotify = {messageAlert: data.message || 'Success', typeAlert: 'success'}
      dispatch(openAlert(infoNotify))
      // onSuccess()
    }
    if (status && status !== 200) {
      infoNotify = {messageAlert: data.message || 'Something wrong', typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
  }

  const [submitting, setSubmitting] = useState(false)
  const handleSubmit = async () => {
    if (formValue.allowBuyNow && !formValue.buyNowPrice) {
      setErrors({...errors, buyNowPrice: 'invalid'})
      return
    }
    try {
      setSubmitting(true)
      await validateData(
        TYPE_SCHEMA.BIDDING_PRODUCT,
        {
          product: formValue.product,
          stepPrice: formValue.stepPrice,
          initPrice: formValue.initPrice,
          endTime: formValue.endTime
        },
        async dataCallback => {
          const payload = {
            product: formValue.product,
            allowBuyNow: formValue.allowBuyNow,
            stepPrice: formValue.stepPrice,
            initPrice: formValue.initPrice,
            publicTime: formValue.publicTime || new Date(),
            endTime: formValue.endTime
          }
          const {status, data, error} = await BiddingProductApi.createDocument(payload)
          console.log('error: ', error)
          console.log('data: ', data)
          console.log('status: ', status)
          handleResult(data, status, error)
        }
      )
    } catch (errs) {
      setErrors(errs)
    }
    setSubmitting(false)
  }
  return (
    <div>
      <Dialog onClose={onClose} aria-labelledby="category-dialog" open={show} fullWidth>
        <DialogTitle id="category-dialog" onClose={onClose}>
          Create new product bidding
        </DialogTitle>
        <DialogContent dividers>
          <SuiBox mb={2}>
            <SuiTypography fontWeight="medium" variant="h6">
              Product
            </SuiTypography>
            <Select
              defaultValue=""
              value={formValue.product || ''}
              onChange={handleChangeValue('product')}
              input={<SuiInput error={Boolean(errors.product)} />}
            >
              {listProducts.map(product => (
                <MenuItem key={product._id} value={product._id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </SuiBox>

          <SuiBox mb={2}>
            <SuiBox display="flex" alignItems="center">
              <Checkbox
                checked={formValue.allowBuyNow || false}
                onChange={handleChangeValue('allowBuyNow')}
              />
              <SuiTypography fontWeight="medium" variant="h6">
                Allow buy now with
              </SuiTypography>
            </SuiBox>
            <SuiInput
              type="number"
              withIcon={{direction: 'right', icon: <AttachMoney />}}
              value={formValue.buyNowPrice || ''}
              onChange={handleChangeValue('buyNowPrice')}
              disabled={!formValue.allowBuyNow}
              error={Boolean(errors.buyNowPrice)}
            />
          </SuiBox>
          <SuiBox mb={2}>
            <SuiTypography fontWeight="medium" variant="h6">
              Price init
            </SuiTypography>
            <SuiInput
              fullWidth
              type="number"
              withIcon={{direction: 'right', icon: <AttachMoney />}}
              value={formValue.initPrice || ''}
              onChange={handleChangeValue('initPrice')}
              error={Boolean(errors.initPrice)}
            />
          </SuiBox>
          <SuiBox mb={2}>
            <SuiTypography fontWeight="medium" variant="h6">
              Price step
            </SuiTypography>
            <SuiInput
              fullWidth
              type="number"
              withIcon={{direction: 'right', icon: <AttachMoney />}}
              value={formValue.stepPrice || ''}
              onChange={handleChangeValue('stepPrice')}
              error={Boolean(errors.stepPrice)}
            />
          </SuiBox>
          <SuiBox mb={2}>
            <SuiTypography fontWeight="medium" variant="h6">
              Start time
            </SuiTypography>
            <SuiInput
              fullWidth
              type="datetime-local"
              value={formValue.publicTime || ''}
              onChange={handleChangeValue('publicTime')}
            />
          </SuiBox>
          <SuiBox mb={2}>
            <SuiTypography fontWeight="medium" variant="h6">
              End time
            </SuiTypography>
            <SuiInput
              fullWidth
              type="datetime-local"
              value={formValue.endTime || ''}
              onChange={handleChangeValue('endTime')}
              error={Boolean(errors.endTime)}
            />
          </SuiBox>
        </DialogContent>
        <DialogActions>
          {submitting ? (
            <SuiButton buttonColor="info" variant="outlined" disabled>
              send...
            </SuiButton>
          ) : (
            <>
              <SuiButton onClick={onClose} buttonColor="secondary" variant="text">
                Close
              </SuiButton>
              <SuiButton onClick={handleSubmit} buttonColor="info" variant="outlined">
                Post
              </SuiButton>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}
