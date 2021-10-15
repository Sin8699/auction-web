import borders from 'assets/theme/base/borders'
import pxToRem from 'assets/theme/functions/pxToRem'

const { borderRadius } = borders

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    borderRadius: borderRadius.xl,
    margin: `${pxToRem(16)} ${pxToRem(16)} 0`
  },

  media: {
    width: 'auto'
  }
}
