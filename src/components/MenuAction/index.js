import React from 'react'
import {MenuItemAction, ListItemMenuIcon} from '../../assets/styled/MenuAction'

const MenuAction = ({listActions}, ref) => {
  return listActions.map(action => {
    const Icon = action.icon
    return (
      <MenuItemAction
        key={action.key}
        onClick={() => {
          action.onClick()
        }}
        ref={ref}
      >
        <ListItemMenuIcon>
          <Icon className="icon" />
        </ListItemMenuIcon>
        {action.label}
      </MenuItemAction>
    )
  })
}

export default React.forwardRef(MenuAction)
