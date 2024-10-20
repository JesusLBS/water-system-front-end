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

interface MenuListButtonProps {
  item: { fullName: string; email: string; };
}

const MenuListButton: React.FC<MenuListButtonProps> = ({ item }) => {
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

  const handleActionClick = (selectedAction: string) => {
    console.log('Selected Action:', selectedAction);
    if (selectedAction === 'Deactivate' || selectedAction === 'Delete') {
      setAction(selectedAction);
      setDialogOpen(true);
    } else if (selectedAction === 'Edit') {
      console.log('Opening Form Dialog');
      setFormDialogOpen(true);
      setIsEdit(true);
    }
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFormDialogClose = () => {
    setFormDialogOpen(false);
    setIsEdit(false);
  };

  return (
    <React.Fragment>
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
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            handleActionClick('Deactivate');
          }}
        >
          <ListItemIcon>
            <DeactivateIcon />
          </ListItemIcon>
          <ListItemText>Deactivate</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            handleActionClick('Delete');
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            handleActionClick('Edit');
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            handleActionClick('Show');
          }}
        >
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          <ListItemText>Show</ListItemText>
        </MenuItem>
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
      />
    </React.Fragment>
  );
};

export default MenuListButton;
