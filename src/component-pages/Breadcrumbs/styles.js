import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(({palette}) => ({
  breadcrumbs: {
    '& .MuiBreadcrumbs-separator': {
      color: ({light}) => (light ? palette.white.main : palette.grey[600])
    }
  }
}))
