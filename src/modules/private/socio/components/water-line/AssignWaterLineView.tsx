import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    TextField,
    MenuItem,
} from '@mui/material';
import { optionsService } from '../../../../../shared/services/back/optionsService';
import waterTakeService from '../../../water-takes/services/waterTakeService';
import { showErrorToast } from '../../../../../utils/toastNotifications';

interface WaterLine {
    id: number;
    name: string;
}

interface Props {
    socioUid: string;
    onSuccess: () => void;
    onClose: () => void;
}

const AssignWaterLineView: React.FC<Props> = ({
    socioUid,
    onSuccess,
    onClose,
}) => {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<WaterLine[]>([]);
    const [selected, setSelected] = useState<number | ''>('');

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const response = await optionsService.waterLines();
                setOptions(response.data.rows);
            } catch (e) {
                console.error(e);
            }
        };

        loadOptions();
    }, []);

    const handleAssign = async () => {
        if (!selected) return;

        try {
            setLoading(true);
            await waterTakeService.assign({ uid: socioUid, waterLineId: selected });

            onSuccess();
            onClose();
        } catch (error: any) {
            if (error.status === 409) {
                showErrorToast('La línea ya está asignada');
                return;
            }

            showErrorToast('Error inesperado al asignar linea');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" flexDirection="column" height="100%" >
            <Typography variant="body2" color="text.secondary" mb={2}>
                Selecciona la línea de agua que deseas asignar a este socio.
            </Typography>

            <TextField
                select
                fullWidth
                label="Línea de Agua"
                value={selected}
                onChange={(e) => setSelected(Number(e.target.value))}
                slotProps={{
                    select: {
                        MenuProps: {
                            disablePortal: true,
                        },
                    },
                }}
            >
                {options.map((line) => (
                    <MenuItem key={line.id} value={line.id}>
                        {line.name}
                    </MenuItem>
                ))}
            </TextField>

            <Box flexGrow={1} />

            <Button
                variant="contained"
                disabled={!selected || loading}
                onClick={handleAssign}
            >
                {loading ? <CircularProgress size={20} /> : 'Asignar Línea'}
            </Button>
        </Box>
    );
};

export default AssignWaterLineView;