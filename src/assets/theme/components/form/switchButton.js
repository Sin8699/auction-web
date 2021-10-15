import colors from 'assets/theme/base/colors'
import borders from 'assets/theme/base/borders'
import boxShadows from 'assets/theme/base/boxShadows'
import rgba from 'assets/theme/functions/rgba'
import pxToRem from 'assets/theme/functions/pxToRem'

const { white, light, gradients } = colors
const { borderWidth } = borders
const { regular } = boxShadows

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    width: pxToRem(40),
    height: pxToRem(20),
    margin: `${pxToRem(4)} 0`,
    padding: 0,
    borderRadius: pxToRem(160)
  },

  switchBase: {
    padding: 0,
    top: '50%',
    transform: `translate(${pxToRem(2)}, -50%)`,
    transition: `transform 250ms ease-in-out`,

    '&$checked': {
      transform: `translate(${pxToRem(22)}, -50%)`,

      '& + $track': {
        backgroundColor: `${rgba(gradients.dark.state, 0.95)} !important`,
        borderColor: `${rgba(gradients.dark.state, 0.95)} !important`,
        opacity: 1
      }
    },

    '&.Mui-disabled': {
      '& + $track': {
        opacity: '0.3 !important'
      }
    }
  },

  thumb: {
    width: pxToRem(16),
    height: pxToRem(16),
    backgroundColor: white.main,
    boxShadow: regular,
    top: '50%'
  },

  track: {
    backgroundColor: rgba(gradients.dark.state, 0.1),
    border: `${borderWidth[1]} solid ${light.main}`,
    borderRadius: pxToRem(160),
    opacity: 1,
    transition: `background-color 250ms ease, border-color 200ms ease`
  },

  checked: {}
}
