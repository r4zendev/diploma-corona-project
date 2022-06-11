import { ReactElement } from 'react';
import { MenuList, MenuItem, ListItemText, ListItemIcon } from '@mui/material';

export interface MenuProps {
  title: string;
  content: ReactElement | string;
}

export function Menu() {
  return (
    <MenuList>
      <MenuItem>
        <ListItemIcon>{/* <ContentCut fontSize="small" /> */}</ListItemIcon>
        <ListItemText>Switch to graphs</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>{/* <ContentCopy fontSize="small" /> */}</ListItemIcon>
        <ListItemText>Show map</ListItemText>
      </MenuItem>
    </MenuList>
  );
}
