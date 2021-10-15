import colors from 'assets/theme/base/colors'
import borders from 'assets/theme/base/borders'
import typography from 'assets/theme/base/typography'

// Soft UI Dashboard Material-UI helper functions
import pxToRem from 'assets/theme/functions/pxToRem'

const { light, text, dark } = colors
const { borderRadius } = borders
const { size } = typography

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    minWidth: pxToRem(160),
    minHeight: 'unset',
    padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
    borderRadius: borderRadius.md,
    fontSize: size.sm,
    color: text.main,
    transition: 'background-color 300ms ease, color 300ms ease',

    '&:hover, &:focus': {
      backgroundColor: light.main,
      color: dark.main
    }
  }
}
