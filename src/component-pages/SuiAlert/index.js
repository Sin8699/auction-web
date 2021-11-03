import {useSelector, useDispatch} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import {Alert as MuiAlert} from '@material-ui/lab'
import {makeStyles} from '@material-ui/core/styles'
import {closeAlert} from 'redux/actions/alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles(theme => ({
  root: {width: '100%', '& > * + *': {marginTop: theme.spacing(2)}}
}))

function SuiAlert() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const alert = useSelector(state => state.alertState)
  const handleClose = () => dispatch(closeAlert())
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={alert.openAlert}
        autoHideDuration={6000}
        onClose={() => dispatch(closeAlert())}
      >
        <Alert onClose={handleClose} severity={alert.typeAlert}>
          {alert.messageAlert}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SuiAlert
