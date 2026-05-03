import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    Box,
    Divider,
    Avatar,
} from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';

import {
    ACTION_DIALOG_CONFIG,
    DialogActionKey,
} from '../interfaces/actionTypes.config.interface';
import { WaterLineRow } from '../interfaces/water-line';

interface ActionsDialogProps {
    open: boolean;
    action: DialogActionKey | null;
    item: WaterLineRow;
    onClose: () => void;
    onConfirm: () => void;
}

const ActionsDialog: React.FC<ActionsDialogProps> = ({
    open,
    action,
    item,
    onClose,
    onConfirm,
}) => {
    if (!action) return null;

    const config = ACTION_DIALOG_CONFIG[action];
    const HeaderIcon = config.HeaderIcon;
    const ConfirmIcon = config.Icon;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            {/* HEADER */}
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    backgroundColor: `${config.confirmColor}.lighter`,
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: `${config.confirmColor}.main`,
                        color: 'common.white',
                        width: 44,
                        height: 44,
                    }}
                >
                    <HeaderIcon fontSize="small" />
                </Avatar>

                <Box>
                    <Typography fontWeight={600}>
                        {config.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This action cannot be undone
                    </Typography>
                </Box>
            </Box>

            {/* CONTENT */}
            <DialogContent sx={{ pt: 3 }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    {config.description}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* USER CARD */}
                <Box
                    sx={{
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        p: 2,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Stack spacing={0.5}>
                        <Typography variant="subtitle2">
                            Linea:  {item.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Status:  {item.status}
                        </Typography>
                    </Stack>
                </Box>
            </DialogContent>

            {/* ACTIONS */}
            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    onClick={onClose}
                    variant="text"
                    startIcon={<CancelIcon />}
                >
                    Cancel
                </Button>

                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color={config.confirmColor}
                    startIcon={<ConfirmIcon />}
                    autoFocus
                >
                    {config.confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ActionsDialog;