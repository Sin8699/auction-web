import borders from 'assets/theme/base/borders'
import colors from 'assets/theme/base/colors'

const { dark } = colors
const { borderWidth, borderColor } = borders

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    color: borderColor,
    transition: 'all 200ms linear'
  },

  alternativeLabel: {
    top: '14%',
    left: '-50%',
    right: '50%'
  },

  line: {
    borderWidth: `${borderWidth[2]} !important`,
    borderColor: 'currentColor'
  },

  active: {
    color: dark.main
  },

  completed: {
    color: dark.main
  }
}
