import React from 'react'
import get from 'lodash/get'

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

export default function ModalRequestUpgradeAdmin({show, onClose, selectedItem}) {
  return (
    <div>
      <Dialog onClose={onClose} aria-labelledby="category-dialog" open={show} fullWidth>
        <DialogTitle id="category-dialog" onClose={onClose}>
          {`Edit user id ${selectedItem._id}`}
        </DialogTitle>
        <DialogContent dividers>
          <SuiBox ml={1}>
            <SuiTypography fontWeight="medium" variant="h6">
              Email user
            </SuiTypography>
          </SuiBox>
          <SuiInput
            fullWidth
            placeholder="Name"
            size="large"
            defaultValue={get(selectedItem, 'createBy.email')}
            disabled
          />
          <SuiBox ml={1} mt={3}>
            <SuiTypography fontWeight="medium" variant="h6">
              Description
            </SuiTypography>
          </SuiBox>
          <SuiInput
            fullWidth
            placeholder="Name"
            size="large"
            defaultValue={get(selectedItem, 'description')}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <SuiButton onClick={onClose} buttonColor="secondary" variant="text">
            Close
          </SuiButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
