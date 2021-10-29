import {Menu, MenuItem, ListItemIcon} from '@material-ui/core'
import styled from 'styled-components'

export const MenuContainer = styled(Menu)`
  margin-top: 3.5rem;
`

export const MenuItemAction = styled(MenuItem)`
  display: flex;
  align-items: center;
  color: #192637;
`

export const ListItemMenuIcon = styled(ListItemIcon)`
  .icon {
    font-size: 23px;
    color: #cacfd3;
    g {
      fill: #cacfd3;
    }
  }
  svg {
    color: #cacfd3;
  }
`
