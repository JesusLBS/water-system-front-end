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
  getUserActionsByStatus
} from '../interfaces/actionTypes.config.interface';
import ActionsDialog from './ActionsDialog';
import { SocioRow } from '../interfaces/socio.interface';

interface MenuListButtonProps {
  item: SocioRow;
  onEdit: (item: SocioRow) => void; // ✅ nueva prop
  onConfirm: (action: DialogActionKey, item: SocioRow) => void;
}

export const MenuListButton: React.FC<MenuListButtonProps> = ({
  item,
  onEdit,
  onConfirm,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [action, setAction] = React.useState<DialogActionKey | null>(null);

  const actions = React.useMemo(
    () => getUserActionsByStatus(item.status),
    [item.status]
  );

  const handleActionClick = (actionItem: ActionItem) => {
    if (actionItem.type === 'form') {
      if (actionItem.key === 'Edit') {
        onEdit(item); // delega al padre
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