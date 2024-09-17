import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface ActionsDialogProps {
    open: boolean;
    onClose: () => void;
    action: string;
    item: { name: string; email: string; role: string };
}

const ActionsDialog: React.FC<ActionsDialogProps> = ({ open, onClose, action, item }) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="action-dialog-title">
            <DialogTitle id="action-dialog-title">
                {action === 'Delete' ? 'Eliminación de usuario' : 'Desactivación de usuario'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`¿Está seguro de ${action === 'Delete' ? 'eliminar' : 'desactivar'} al siguiente usuario?`}
                </DialogContentText>
                <DialogContentText>
                    <strong>Nombre:</strong> {item.name}
                </DialogContentText>
                <DialogContentText>
                    <strong>Rol:</strong> {item.role}
                </DialogContentText>
                <DialogContentText>
                    <strong>Email:</strong> {item.email}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onClose} color="secondary" autoFocus>
                    Yes, Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ActionsDialog;
