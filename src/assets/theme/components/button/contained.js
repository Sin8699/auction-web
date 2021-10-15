import colors from 'assets/theme/base/colors'
import typography from 'assets/theme/base/typography'
import boxShadows from 'assets/theme/base/boxShadows'
import pxToRem from 'assets/theme/functions/pxToRem'

const { white, text, info, secondary } = colors
const { size } = typography
const { buttonBoxShadow } = boxShadows

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  base: {
    backgroundColor: white.main,
    minHeight: pxToRem(40),
    color: text.main,
    boxShadow: buttonBoxShadow.main,
    padding: `${pxToRem(12)} ${pxToRem(24)}`,

    '&:hover': {
      backgroundColor: white.main,
      boxShadow: buttonBoxShadow.stateOf
    },

    '&:focus': {
      boxShadow: buttonBoxShadow.stateOf
    },

    '&:active, &:active:focus, &:active:hover': {
      opacity: 0.85,
      boxShadow: buttonBoxShadow.stateOf
    },

    '&:disabled': {
      boxShadow: buttonBoxShadow.main
    }
  },

  small: {
    minHeight: pxToRem(32),
    padding: `${pxToRem(8)} ${pxToRem(32)}`,
    fontSize: size.xs,

    '& .material-icons': {
      fontSize: pxToRem(12)
    }
  },

  large: {
    minHeight: pxToRem(47),
    padding: `${pxToRem(14)} ${pxToRem(64)}`,
    fontSize: size.sm,

    '& .material-icons': {
      fontSize: pxToRem(22)
    }
  },

  primary: {
    backgroundColor: info.main,

    '&:hover': {
      backgroundColor: info.main
    },

    '&:focus:not(:hover)': {
      backgroundColor: info.focus,
      boxShadow: buttonBoxShadow.stateOfNotHover
    }
  },

  secondary: {
    backgroundColor: secondary.main,

    '&:hover': {
      backgroundColor: secondary.main
    },

    '&:focus:not(:hover)': {
      backgroundColor: secondary.focus,
      boxShadow: buttonBoxShadow.stateOfNotHover
    }
  }
}
