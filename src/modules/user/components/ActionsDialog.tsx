import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Typography,
} from '@mui/material';

import {
    Warning as WarningIcon,
    Delete as DeleteIcon,
    Cancel as CancelIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material';


interface ActionsDialogProps {
    open: boolean;
    onClose: () => void;
    action: string;
    item: { name: string; email: string; role: string };
}

const ActionsDialog: React.FC<ActionsDialogProps> = ({ open, onClose, action, item }) => {
    const isDelete = action === 'Delete';

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="action-dialog-title">
            <DialogTitle id="action-dialog-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <WarningIcon color="error" />
                {isDelete ? 'Eliminación de usuario' : 'Desactivación de usuario'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`¿Está seguro de ${isDelete ? 'eliminar' : 'desactivar'} al siguiente usuario?`}
                </DialogContentText>
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                    <strong>Nombre:</strong> {item.name}
                </Typography>
                <Typography variant="body2">
                    <strong>Rol:</strong> {item.role}
                </Typography>
                <Typography variant="body2">
                    <strong>Email:</strong> {item.email}
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                }}>
                <Button onClick={onClose} color="primary" startIcon={<CancelIcon />}>
                    Cancel
                </Button>
                <Button onClick={onClose} color="secondary" startIcon={isDelete ? <DeleteIcon /> : <CheckCircleIcon />} autoFocus>
                    {isDelete ? 'Eliminar' : 'Desactivar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ActionsDialog;
