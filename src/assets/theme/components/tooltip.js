import colors from 'assets/theme/base/colors'
import typography from 'assets/theme/base/typography'
import borders from 'assets/theme/base/borders'
import pxToRem from 'assets/theme/functions/pxToRem'

const { black, light } = colors
const { size, fontWeightRegular } = typography
const { borderRadius } = borders

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  tooltip: {
    maxWidth: pxToRem(200),
    backgroundColor: black.main,
    color: light.main,
    fontSize: size.sm,
    fontWeight: fontWeightRegular,
    textAlign: 'center',
    borderRadius: borderRadius.md,
    opacity: 0.7,
    padding: `${pxToRem(5)} ${pxToRem(8)} ${pxToRem(4)}`
  },

  arrow: {
    color: black.main
  }
}
