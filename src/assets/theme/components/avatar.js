import borders from 'assets/theme/base/borders'

const { borderRadius } = borders

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    transition: 'all 200ms ease-in-out'
  },

  rounded: {
    borderRadius: borderRadius.lg
  },

  img: {
    height: 'auto'
  }
}
