import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SuspendWaterLineView from './SuspendWaterLineView';
import AssignWaterLineView from './AssignWaterLineView';

type WaterTakeAssigned = {
    status: 'assigned';
    waterTakeId: number;
    waterLineId: number;
    waterLineName: string;
    isSuspended: boolean;
};

type WaterTakeEmpty = {
    status: 'empty';
    isSuspended: boolean;
};

export type WaterTakeState = WaterTakeAssigned | WaterTakeEmpty;

interface Props {
    open: boolean;
    onClose: () => void;
    socioUid: string;
    waterTake: WaterTakeState;
    onSuccess: () => void;
}

const WaterLineActionPanel: React.FC<Props> = ({
    open,
    onClose,
    socioUid,
    waterTake,
    onSuccess,
}) => {
    const hasWaterLine = waterTake.status === 'assigned';
    const isSuspended = waterTake.isSuspended;

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                zIndex: 2000,
            }}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 420 },
                    p: 3,
                },
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={600}>
                    {isSuspended ? ('Reactivar Línea de Agua') :
                        (hasWaterLine ? 'Suspender Línea de Agua' : 'Asignar Línea de Agua')
                    }
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider sx={{ my: 2 }} />
            {hasWaterLine ? (
                <SuspendWaterLineView
                    socioUid={socioUid}
                    waterTake={waterTake}
                    onSuccess={onSuccess}
                    onClose={onClose}
                />
            ) : (
                <AssignWaterLineView
                    socioUid={socioUid}
                    onSuccess={onSuccess}
                    onClose={onClose}
                />
            )}
        </Drawer>
    );
};

export default WaterLineActionPanel;