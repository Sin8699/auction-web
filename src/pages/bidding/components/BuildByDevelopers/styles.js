import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ functions }) => {
  const { pxToRem } = functions

  return {
    buildByDevelopers_button: {
      marginTop: 'auto',
      marginRight: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',

      '& .material-icons': {
        fontSize: '1.125rem',
        transform: `translate(${pxToRem(2)}, ${pxToRem(-1)})`,
        transition: 'transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)'
      },

      '&:hover .material-icons, &:focus .material-icons': {
        transform: `translate(${pxToRem(6)}, ${pxToRem(-1)})`
      }
    }
  }
})
