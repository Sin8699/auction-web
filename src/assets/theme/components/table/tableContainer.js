import colors from 'assets/theme/base/colors'
import boxShadows from 'assets/theme/base/boxShadows'
import borders from 'assets/theme/base/borders'

const { white } = colors
const { xxl } = boxShadows
const { borderRadius } = borders

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    backgroundColor: white.main,
    boxShadow: xxl,
    borderRadius: borderRadius.xl
  }
}
