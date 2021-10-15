import typography from 'assets/theme/base/typography'
import borders from 'assets/theme/base/borders'
import colors from 'assets/theme/base/colors'
import pxToRem from 'assets/theme/functions/pxToRem'

const { size, fontWeightRegular } = typography
const { borderRadius } = borders
const { dark } = colors

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    flex: '1 1 auto',
    textAlign: 'center',
    maxWidth: 'unset !important',
    minWidth: 'unset !important',
    minHeight: 'unset !important',
    fontSize: size.regular,
    fontWeight: fontWeightRegular,
    textTransform: 'none',
    lineHeight: 'inherit',
    padding: pxToRem(4),
    borderRadius: borderRadius.md,
    color: `${dark.main} !important`,
    opacity: '1 !important'
  },

  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',

    '& .material-icons': {
      marginBottom: '0 !important',
      marginRight: pxToRem(4)
    },

    '& svg': {
      marginBottom: '0 !important',
      marginRight: pxToRem(6)
    }
  },

  labelIcon: {
    paddingTop: pxToRem(4)
  }
}
