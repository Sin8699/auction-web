import colors from 'assets/theme/base/colors'
import pxToRem from 'assets/theme/functions/pxToRem'

const { transparent } = colors

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    margin: `${pxToRem(48)} 0`,
    padding: `0 ${pxToRem(12)}`,

    '&.MuiPaper-root': {
      backgroundColor: transparent.main
    }
  }
}
