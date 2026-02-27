import React from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Chip,
    Avatar,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PersonPinCircleOutlined } from '@mui/icons-material';

interface Props {
    data: any;
    fullName: string;
    onBack: () => void;
    onWaterLineAction: () => void;
}

const SocioDetailHeader: React.FC<Props> = ({
    data,
    fullName,
    onBack,
    onWaterLineAction,
}) => {
    const hasWaterLine = Boolean(data.waterTake?.waterLineId);
    const isSuspended = data.waterTake.isSuspended;
    const buttonConfig: any = !hasWaterLine
        ? { label: 'Asignar Línea', color: 'primary' }
        : isSuspended
            ? { label: 'Reactivar Línea', color: 'success' }
            : { label: 'Suspender Línea', color: 'warning' };
    return (
        <Paper
            sx={{
                p: 4,
                mb: 3,
                width: '100%',
                borderLeft: '6px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
            }}
        >
            <Grid container spacing={3} alignItems="center">
                {/* Avatar */}
                <Grid size={{ xs: 12, md: 2 }} display="flex" justifyContent="center">
                    <Avatar
                        sx={{
                            width: 90,
                            height: 90,
                            fontSize: 32,
                            bgcolor: 'primary.main',
                        }}
                    >
                        {data.user.name
                            ? data.user.name.charAt(0).toUpperCase()
                            : <PersonPinCircleOutlined />}
                    </Avatar>
                </Grid>

                {/* Name + Chips */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        fontWeight={600}
                        sx={{
                            fontSize: {
                                xs: '1.5rem',
                                sm: '1.75rem',
                                md: '2.2rem',
                            },
                            lineHeight: 1.2,
                            wordBreak: 'break-word',
                        }}
                    >
                        {fullName}
                    </Typography>

                    <Box
                        mt={{ xs: 1.5, md: 1 }}
                        display="flex"
                        gap={1.5}
                        flexWrap="wrap"
                    >
                        <Chip
                            label={`UID: ${data.user.uid.slice(0, 8)}`}
                            size="small"
                            variant="outlined"
                        />

                        {hasWaterLine && !isSuspended ? (
                            <Chip
                                label={`Línea: ${data.waterTake.waterLineName}`}
                                size="small"
                                color="success"
                            />
                        ) : (
                            <Chip
                                label={`Línea: ${isSuspended ? 'Suspendida' : 'no asignada'}`}
                                //label="Línea no asignada"
                                size="small"
                                color="warning"
                            />
                        )}
                    </Box>
                </Grid>

                {/* Stats + Actions */}
                <Grid
                    size={{ xs: 12, md: 4 }}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: { xs: 'center', md: 'flex-end' },
                        alignItems: { xs: 'stretch', md: 'center' },
                        gap: { xs: 2, md: 3 },
                    }}
                >
                    {/* Stats */}
                    <Box
                        display="flex"
                        justifyContent={{ xs: 'space-around', md: 'flex-end' }}
                        gap={{ xs: 2, md: 4 }}
                    >
                        <Box textAlign="center">
                            <Typography variant="caption" color="text.secondary">
                                Edad
                            </Typography>
                            <Typography
                                fontWeight={700}
                                sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}
                            >
                                {data.profile.age}
                            </Typography>
                        </Box>

                        <Box textAlign="center">
                            <Typography variant="caption" color="text.secondary">
                                Dependientes
                            </Typography>
                            <Typography
                                fontWeight={700}
                                sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}
                            >
                                {data.profile.totalDependents}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Actions */}
                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', md: 'row' }}
                        gap={2}
                        width={{ xs: '100%', md: 'auto' }}
                    >
                        <Button
                            variant="contained"
                            color={buttonConfig.color}
                            size="small"
                            onClick={onWaterLineAction}
                            sx={{ width: { xs: '100%', md: 'auto' } }}
                        >
                            {buttonConfig.label}
                        </Button>

                        <Button
                            variant="contained"
                            size="small"
                            onClick={onBack}
                            sx={{
                                width: { xs: '100%', md: 'auto' },
                            }}
                        >
                            Regresar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SocioDetailHeader;