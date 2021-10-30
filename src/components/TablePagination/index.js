import SuiPagination from '../SuiPagination'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'

const TablePagination = ({ page, totalPage, onChangePage }) => {
  return (
    <SuiPagination variant="contained">
      <SuiPagination item onClick={() => onChangePage(1)}>
        <ChevronLeft />
      </SuiPagination>
      {page === totalPage && (
        <SuiPagination item onClick={() => onChangePage(page - 2)}>
          {page - 2}
        </SuiPagination>
      )}
      {page !== 1 && (
        <SuiPagination item onClick={() => onChangePage(page - 1)}>
          {page - 1}
        </SuiPagination>
      )}
      <SuiPagination active item>
        {page}
      </SuiPagination>
      {page !== totalPage && (
        <SuiPagination item onClick={() => onChangePage(page + 1)}>
          {page + 1}
        </SuiPagination>
      )}
      {page === 1 && (
        <SuiPagination item onClick={() => onChangePage(page + 2)}>
          {page + 2}
        </SuiPagination>
      )}
      <SuiPagination item onClick={() => onChangePage(totalPage)}>
        <ChevronRight />
      </SuiPagination>
    </SuiPagination>
  )
}

export default TablePagination
