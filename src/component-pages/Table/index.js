import { useMemo } from 'react'

import PropTypes from 'prop-types'

import { Table as MuiTable } from '@material-ui/core'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'

import SuiBox from 'components/SuiBox'
import SuiAvatar from 'components/SuiAvatar'
import SuiTypography from 'components/SuiTypography'

import colors from 'assets/theme/base/colors'
import typography from 'assets/theme/base/typography'
import borders from 'assets/theme/base/borders'

function Table({ columns, rows }) {
  const { light } = colors
  const { size, fontWeightBold } = typography
  const { borderWidth } = borders

  const renderColumns = columns.map(({ name, align }, key) => {
    let pl
    let pr

    if (key === 0) {
      pl = 3
      pr = 3
    } else if (key === columns.length - 1) {
      pl = 3
      pr = 3
    } else {
      pl = 1
      pr = 1
    }

    return (
      <SuiBox
        key={name}
        component="th"
        pt={1.5}
        pb={1.25}
        pl={align === 'left' ? pl : 3}
        pr={align === 'right' ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {name.toUpperCase()}
      </SuiBox>
    )
  })

  const renderRows = rows.map((row, key) => {
    console.log('row', row)
    const rowKey = `row-${key}`

    const tableRow = columns.map(({ key: keyCol, align }) => {
      let template

      if (Array.isArray(row[keyCol])) {
        template = (
          <SuiBox key={row[keyCol][1]} component="td" p={1}>
            <SuiBox display="flex" alignItems="center" py={0.5} px={1}>
              <SuiBox mr={2}>
                {typeof row[keyCol][0] === 'string' ? (
                  <SuiAvatar
                    src={row[keyCol][0]}
                    name={row[keyCol][1]}
                    variant="rounded"
                    size="sm"
                  />
                ) : (
                  row[keyCol][0]
                )}
              </SuiBox>
              <SuiTypography variant="button" fontWeight="medium" customClass="w-max">
                {row[keyCol][1]}
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        )
      } else {
        template = (
          <SuiBox key={row[keyCol]} component="td" p={1} textAlign={align}>
            <SuiTypography
              variant="button"
              fontWeight="regular"
              textColor="secondary"
              customClass="d-inline-block w-max"
            >
              {row[keyCol]}
            </SuiTypography>
          </SuiBox>
        )
      }

      return template
    })

    return <TableRow key={rowKey}>{tableRow}</TableRow>
  })

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <SuiBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </SuiBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [renderColumns, renderRows]
  )
}

Table.defaultProps = {
  columns: [],
  rows: [{}]
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object)
}

export default Table
