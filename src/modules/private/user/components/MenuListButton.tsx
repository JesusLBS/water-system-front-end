import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Block as DeactivateIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import ActionsDialog from './ActionsDialog';
import FormDialog from './FomDialog';
import { UserRow } from '../interfaces/user.interface';

interface MenuListButtonProps {
  item: UserRow;
  onEditSubmit: (values: any, isEdit: boolean) => void; // callback hacia el padre
}

type ActionType = 'dialog' | 'form';

interface ActionItem {
  key: string;
  label: string;
  Icon: React.ElementType;
  type: ActionType;
}

const actions: ActionItem[] = [
  { key: 'Deactivate', label: 'Deactivate', Icon: DeactivateIcon, type: 'dialog' },
  { key: 'Delete', label: 'Delete', Icon: DeleteIcon, type: 'dialog' },
  { key: 'Edit', label: 'Edit', Icon: EditIcon, type: 'form' },
  { key: 'Show', label: 'Show', Icon: VisibilityIcon, type: 'form' },
];

const MenuListButton: React.FC<MenuListButtonProps> = ({ item, onEditSubmit }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [formDialogOpen, setFormDialogOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [action, setAction] = React.useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (selectedAction: string, type: ActionType) => {
    if (type === 'dialog') {
      setAction(selectedAction);
      setDialogOpen(true);
    } else if (type === 'form') {
      setIsEdit(selectedAction === 'Edit');
      setFormDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleDialogClose = () => setDialogOpen(false);

  const handleFormDialogClose = () => {
    setFormDialogOpen(false);
    setIsEdit(false);
  };

  const handleFormSubmit = (values: any) => {
    onEditSubmit(values, isEdit);
    handleFormDialogClose();
  };

  return (
    <>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          handleMenuOpen(event);
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {actions.map(({ key, label, Icon, type }) => (
          <MenuItem
            key={key}
            onClick={(event) => {
              event.stopPropagation();
              handleActionClick(key, type);
            }}
          >
            <ListItemIcon><Icon /></ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {action && (
        <ActionsDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          action={action}
          item={item}
        />
      )}

      <FormDialog
        openDialog={formDialogOpen}
        onClose={handleFormDialogClose}
        isEdit={isEdit}
        item={item}
        onSubmit={handleFormSubmit} // llama a UserPage con valores y flag de edición
      />
    </>
  );
};

export default MenuListButton;
