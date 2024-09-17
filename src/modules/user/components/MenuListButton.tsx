import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeactivateIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ActionsDialog from './ActionsDialog'; // Importa el componente de diálogo de confirmación
import FormDialog from './FomDialog';


interface MenuListButtonProps {
  item: { name: string; email: string; role: string };
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
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleActionClick('Deactivate')}>
          <ListItemIcon>
            <DeactivateIcon />
          </ListItemIcon>
          <ListItemText>Deactivate</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('Delete')}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('Edit')}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('Show')}>
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
