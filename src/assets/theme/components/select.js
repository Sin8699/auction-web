import colors from 'assets/theme/base/colors'
import pxToRem from 'assets/theme/functions/pxToRem'

const { transparent } = colors

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  select: {
    display: 'grid',
    alignItems: 'center',
    padding: `0 ${pxToRem(12)} !important`,

    '&:focus': {
      backgroundColor: transparent.main
    }
  },

  selectMenu: {
    background: 'none',
    height: 'none',
    minHeight: 'none',
    overflow: 'unset'
  },

  icon: {
    display: 'none'
  }
}
