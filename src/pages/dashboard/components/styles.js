import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ borders }) => {
  const { borderWidth, borderColor } = borders

  return {
    tables_table: {
      '& .MuiTableRow-root:not(:last-child)': {
        '& td': {
          borderBottom: `${borderWidth[1]} solid ${borderColor}`
        }
      }
    }
  }
})
