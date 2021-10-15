import typography from 'assets/theme/base/typography'
import colors from 'assets/theme/base/colors'
import pxToRem from 'assets/theme/functions/pxToRem'

const { size, fontWeightRegular } = typography
const { grey, dark, secondary } = colors

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  label: {
    marginTop: `${pxToRem(8)} !important`,
    fontWeight: fontWeightRegular,
    fontSize: size.regular,
    color: grey[300]
  },

  active: {
    fontWeight: `${fontWeightRegular} !important`,
    color: `${dark.main} !important`
  },

  completed: {
    fontWeight: `${fontWeightRegular} !important`,
    color: `${secondary.main} !important`
  }
}
