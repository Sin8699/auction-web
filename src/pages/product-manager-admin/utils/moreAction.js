import DeleteIcon from '@material-ui/icons/Delete'
import InfoIcon from '@material-ui/icons/Info'

export const renderAction = ({onDetail, onDelete}) => {
  const LIST_ACTIONS = [
    {
      key: 'detail',
      icon: InfoIcon,
      label: 'Detail',
      onClick: onDetail
    },
    {
      key: 'delete',
      icon: DeleteIcon,
      label: 'Delete',
      onClick: onDelete
    }
  ]
  return LIST_ACTIONS
}
