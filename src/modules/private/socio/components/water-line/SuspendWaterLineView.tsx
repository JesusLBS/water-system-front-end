import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import waterTakeService from '../../../water-takes/services/waterTakeService';

type WaterTakeAssigned = {
    waterTakeId: number;
    waterLineId: number;
    waterLineName: string;
    isSuspended: boolean;
};

interface Props {
    socioUid: string;
    waterTake: WaterTakeAssigned;
    onSuccess: () => void;
    onClose: () => void;
}

const SuspendWaterLineView: React.FC<Props> = ({
    socioUid,
    waterTake,
    onSuccess,
    onClose,
}) => {
    const [loading, setLoading] = useState(false);
    const isSuspended = waterTake.isSuspended;

    const handleAction = async () => {
        try {
            setLoading(true);

            if (isSuspended) {
                await waterTakeService.restore(waterTake.waterTakeId);
            } else {
                await waterTakeService.deactivate(waterTake.waterTakeId);
            }

            onSuccess();
            onClose();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Alert
                severity={isSuspended ? 'info' : 'warning'}
                sx={{ mb: 2 }}
            >
                {isSuspended
                    ? 'Esta acción reactivará la línea de agua.'
                    : 'Esta acción suspenderá la línea de agua asignada.'}
            </Alert>

            <Typography variant="body2" color="text.secondary">
                Línea actual:
            </Typography>

            <Typography fontWeight={600} mb={3}>
                {waterTake.waterLineName}
            </Typography>

            <Box flexGrow={1} />

            <Button
                variant="contained"
                color={isSuspended ? 'success' : 'warning'}
                onClick={handleAction}
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size={20} />
                ) : isSuspended ? (
                    'Confirmar Reactivación'
                ) : (
                    'Confirmar Suspensión'
                )}
            </Button>
        </Box>
    );
};

export default SuspendWaterLineView;