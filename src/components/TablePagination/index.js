import SuiPagination from '../SuiPagination'
import {ChevronLeft, ChevronRight} from '@material-ui/icons'

const TablePagination = ({page, totalPage, onChangePage}) => {
  const isFirstPage = page === 1
  const isLastPage = page === totalPage
  const isShowButtonTwoLevelPrevious = page === totalPage && totalPage !== 1 && totalPage !== 2
  const isShowButtonTwoLevelNext = page === 1 && totalPage !== 1 && totalPage !== 2
  return (
    <SuiPagination variant="contained">
      <SuiPagination item active={isFirstPage} color="light" onClick={() => onChangePage(1)}>
        <ChevronLeft />
      </SuiPagination>
      {isShowButtonTwoLevelPrevious && (
        <SuiPagination item onClick={() => onChangePage(page - 2)}>
          {page - 2}
        </SuiPagination>
      )}
      {!isFirstPage && (
        <SuiPagination item onClick={() => onChangePage(page - 1)}>
          {page - 1}
        </SuiPagination>
      )}
      <SuiPagination active item>
        {page}
      </SuiPagination>
      {!isLastPage && (
        <SuiPagination item onClick={() => onChangePage(page + 1)}>
          {page + 1}
        </SuiPagination>
      )}
      {isShowButtonTwoLevelNext && (
        <SuiPagination item onClick={() => onChangePage(page + 2)}>
          {page + 2}
        </SuiPagination>
      )}
      <SuiPagination item active={isLastPage} color="light" onClick={() => onChangePage(totalPage)}>
        <ChevronRight />
      </SuiPagination>
    </SuiPagination>
  )
}

export default TablePagination
