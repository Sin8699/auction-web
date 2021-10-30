import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(({palette, functions}) => {
  const {text, gradients} = palette
  const {linearGradient} = functions

  return {
    progress: {
      '& .MuiLinearProgress-bar': {
        backgroundColor: ({color}) => palette[color].main,
        width: ({value}) => `${value}%`,
        color: text.main
      }
    },

    progress_gradient: {
      '& .MuiLinearProgress-bar': {
        background: ({color}) => linearGradient(gradients[color].main, gradients[color].state)
      }
    }
  }
})
