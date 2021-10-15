import borders from 'assets/theme/base/borders'
import pxToRem from 'assets/theme/functions/pxToRem'

const { borderRadius } = borders

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    display: 'block',
    padding: `${pxToRem(16)} ${pxToRem(16)} 0  ${pxToRem(16)}`,
    borderRadius: `${borderRadius.xl} ${borderRadius.xl} 0 0`
  }
}
