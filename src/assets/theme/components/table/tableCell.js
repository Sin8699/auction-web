import borders from 'assets/theme/base/borders'
import colors from 'assets/theme/base/colors'
import pxToRem from 'assets/theme/functions/pxToRem'

const { borderWidth } = borders
const { light } = colors

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    padding: `${pxToRem(12)} ${pxToRem(16)}`,
    borderBottom: `${borderWidth[1]} solid ${light.main}`
  }
}
