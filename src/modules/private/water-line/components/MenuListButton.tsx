import * as React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  ActionItem,
  DialogActionKey,
  getWaterLineActionsByStatus
} from '../interfaces/actionTypes.config.interface';

import { WaterLineRow } from '../interfaces/water-line';
import ActionsDialog from './ActionsDialog';

interface MenuListButtonProps {
  item: WaterLineRow;
  onEdit: (item: WaterLineRow) => void;
  onDetail: (item: WaterLineRow) => void;
  onConfirm: (action: DialogActionKey, item: WaterLineRow) => void;
}

export const MenuListButton: React.FC<MenuListButtonProps> = ({
  item,
  onEdit,
  onDetail,
  onConfirm,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [action, setAction] = React.useState<DialogActionKey | null>(null);

  const actions = React.useMemo(
    () => getWaterLineActionsByStatus(item.status),
    [item.status]
  );

  const handleActionClick = (actionItem: ActionItem) => {
    if (actionItem.type === 'form') {
      if (actionItem.key === 'Edit') {
        onEdit(item);
      }
      if (actionItem.key === 'Detail') {
        onDetail(item);
      }
      return;
    }

    setAction(actionItem.key as DialogActionKey);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setAction(null);
  };

  const handleConfirm = () => {
    if (!action) return;
    onConfirm(action, item);
    handleDialogClose();
  };

  return (
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {actions.map((actionItem) => (
          <MenuItem
            key={actionItem.key}
            onClick={(e) => {
              e.stopPropagation();
              handleActionClick(actionItem);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <actionItem.Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{actionItem.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      <ActionsDialog
        open={dialogOpen}
        action={action}
        item={item}
        onClose={handleDialogClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};