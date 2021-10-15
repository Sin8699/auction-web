import colors from 'assets/theme/base/colors'

const { transparent } = colors

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    '&:hover': {
      backgroundColor: transparent.main
    }
  }
}
