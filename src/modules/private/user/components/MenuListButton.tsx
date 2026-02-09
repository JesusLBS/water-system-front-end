import * as React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ActionItem, DialogActionKey, getUserActionsByStatus } from '../interfaces/actionTypes.config.interface';

import FormDialog from './FomDialog';
import { UserRow } from '../interfaces/user.interface';
import ActionsDialog from './ActionsDialog';

interface MenuListButtonProps {
  item: UserRow;
  onEditSubmit: (values: any, isEdit: boolean) => void;
  onConfirm: (action: DialogActionKey, item: UserRow) => void;
}

export const MenuListButton: React.FC<MenuListButtonProps> = ({
  item,
  onEditSubmit,
  onConfirm,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [formDialogOpen, setFormDialogOpen] = React.useState(false);

  const [isEdit, setIsEdit] = React.useState(false);
  const [isShow, setIsShow] = React.useState(false);
  const [action, setAction] = React.useState<DialogActionKey | null>(null);
  const actions = React.useMemo(
    () => getUserActionsByStatus(item.status),
    [item.status]
  );

  const handleActionClick = (actionItem: ActionItem) => {
    if (actionItem.type === 'form') {
      setIsEdit(actionItem.key === 'Edit');
      setIsShow(actionItem.key === 'Show');
      setFormDialogOpen(true);
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
      <IconButton onClick={(e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget)
      }}>
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

      <FormDialog
        openDialog={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        isEdit={isEdit}
        isShow={isShow}
        item={item}
        onSubmit={(values) => onEditSubmit(values, isEdit)}
      />
    </>
  );
};