import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    Box,
    IconButton,
    TextField,
    Button,
    Stack
} from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { WaterLineRow } from '../interfaces/water-line';

interface FormDialogProps {
    openDialog: boolean;
    onClose: () => void;
    isEdit: boolean;
    item?: WaterLineRow;
    onSubmit: (data: { name: string }, isEdit: boolean) => void;
}

const FormDialog: React.FC<FormDialogProps> = ({
    openDialog,
    onClose,
    isEdit,
    item,
    onSubmit
}) => {

    const [name, setName] = useState('');

    // Reset when dialog closes
    useEffect(() => {
        if (!openDialog) {
            setName('');
        }
    }, [openDialog]);

    // Fill data when editing
    useEffect(() => {
        if (openDialog && isEdit && item) {
            setName(item.name || '');
        }
    }, [openDialog, isEdit, item]);

    const handleSubmit = () => {
        if (!name.trim()) return;
        onSubmit({ name: name.trim() }, isEdit);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={(_, reason) => {
                if (reason === 'backdropClick') return;
                onClose();
            }}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pr: 1,
                }}
            >
                {isEdit ? 'Edit Water Line' : 'Add Water Line'}

                <IconButton onClick={onClose} size="small">
                    <GridCloseIcon />
                </IconButton>
            </DialogTitle>

            <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                    <TextField
                        label="Water Line Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        autoFocus
                    />

                    <Stack direction="row" justifyContent="flex-end" spacing={1}>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={!name.trim()}
                        >
                            {isEdit ? 'Update' : 'Create'}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Dialog>
    );
};

export default FormDialog;