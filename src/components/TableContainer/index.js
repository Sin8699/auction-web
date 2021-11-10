import React, {useState, useEffect} from 'react'
import get from 'lodash/get'
import {
  Table,
  TableContainer as MUTableContainer,
  TableBody,
  TableRow,
  InputBase
} from '@material-ui/core'
import SuiButton from 'components/SuiButton'
import {filter, includes} from 'lodash'
import {makeStyles} from '@material-ui/core/styles'
import Flex from '../../assets/styled/FlexLayout'
import {PaperWrapped} from '../../assets/styled/TableContainer'

const useStyles = makeStyles({
  tableContainer: {width: '100%', margin: 0, paddingTop: 30, overflow: 'auto'}
})

const TableContainer = ({
  data = [],
  header: Header,
  onAddNew,
  txtBtnAddNew = 'New',
  ToolbarComponent,
  page,
  renderRow,
  searchKey,
  keyRender = 'id'
}) => {
  const classes = useStyles()

  const [localData, setLocalData] = useState(data)

  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!!search) {
      const filteredData = filter(data, item => {
        return includes(get(item, `${searchKey}`)?.toString()?.toLowerCase(), search.toLowerCase())
      })
      setLocalData(filteredData)
    } else setLocalData(data)
  }, [data, search, searchKey])

  return (
    <PaperWrapped>
      <MUTableContainer style={{padding: 10}}>
        <Flex justifyBetween>
          <Flex width="100%">
            <InputBase
              style={{width: '50%'}}
              value={search}
              onChange={e => setSearch(e.target.value)}
              fullWidth
              placeholder="Search..."
            />
            {ToolbarComponent}
          </Flex>
          <Flex>
            {onAddNew && (
              <SuiButton size="large" buttonColor="info" variant="outlined" onClick={onAddNew}>
                {txtBtnAddNew}
              </SuiButton>
            )}
          </Flex>
        </Flex>
        <div className={classes.tableContainer}>
          <Table>
            {Header && <Header />}
            <TableBody>
              {localData.slice((page - 1) * 10, (page - 1) * 10 + 10).map((d, i) => (
                <TableRow key={d[keyRender]} hover>
                  {renderRow(d, i)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </MUTableContainer>
    </PaperWrapped>
  )
}

export default TableContainer
