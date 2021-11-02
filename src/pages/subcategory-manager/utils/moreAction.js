import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

export const renderAction = ({onEdit, onDelete}) => {
  const LIST_ACTIONS = [
    {
      key: 'edit',
      icon: EditIcon,
      label: 'Edit',
      onClick: onEdit
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
