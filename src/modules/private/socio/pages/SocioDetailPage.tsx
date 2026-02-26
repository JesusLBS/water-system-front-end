import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Divider,
    CircularProgress,
    Chip,
    Avatar,
    Tabs,
    Tab,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import UserInfoFields from '../components/form-sections/UserInfoFields';
import ProfileInfoFields from '../components/form-sections/ProfileInfoFields';
import AddressInfoFields from '../components/form-sections/AddressInfoFields';
import { SocioDetailResponse, SocioResponseDTO } from '../interfaces/socio.interface';
import SocioService from '../services/socioService';
import Grid from '@mui/material/Grid2';
import { PersonPinCircleOutlined } from '@mui/icons-material';

const socioService = new SocioService();

const SocioDetailPage: React.FC = () => {
    const { uid } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState<SocioResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleBack = () => {
        navigate('/private/socios');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!uid) return;

                const response: SocioDetailResponse = await socioService.edit(uid);
                setData(response.data);
            } catch (error) {
                console.error('Error loading socio detail', error);
            } finally {
                await new Promise((resolve) => setTimeout(resolve, 500));
                setLoading(false);
            }
        };

        fetchData();
    }, [uid]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (!data) {
        return <Typography>No data found</Typography>;
    }

    const fullName = `${data.user.name} ${data.profile.lastName} ${data.profile.secondLastName}`;

    return (
        <Box p={3}>
            {/* HEADER */}
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

                    <Grid size={{ xs: 12, md: 6 }}
                    >
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

                            {data.waterTake ? (
                                <Chip
                                    label={`Línea: ${data.waterTake.waterLineName}`}
                                    size="small"
                                    color="success"
                                />
                            ) : (
                                <Chip
                                    label="Línea no asignada"
                                    size="small"
                                    color="warning"
                                />
                            )}
                        </Box>
                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 4 }}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: { xs: 'center', md: 'flex-end' },
                            alignItems: { xs: 'stretch', md: 'center' },
                            gap: { xs: 2, md: 4 },
                        }}
                    >
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

                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleBack}
                            sx={{
                                alignSelf: { xs: 'center', md: 'auto' },
                                width: { xs: '100%', md: 'auto' },
                            }}
                        >
                            Regresar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* FORM + TABS */}
            <Formik
                enableReinitialize
                initialValues={{
                    ...data.user,
                    ...data.profile,
                    ...data.address,
                }}
                onSubmit={(values) => {
                    console.log('Future update payload', values);
                }}
            >
                {({ touched, errors }) => {
                    const tabsConfig = [
                        {
                            label: 'Usuario',
                            component: (
                                <>
                                    <Typography variant="h6" gutterBottom>
                                        Información de Usuario
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <UserInfoFields touched={touched} errors={errors} />
                                </>
                            ),
                        },
                        {
                            label: 'Perfil',
                            component: (
                                <>
                                    <Typography variant="h6" gutterBottom>
                                        Información de Perfil
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <ProfileInfoFields touched={touched} errors={errors} />
                                </>
                            ),
                        },
                        {
                            label: 'Dirección',
                            component: (
                                <>
                                    <Typography variant="h6" gutterBottom>
                                        Dirección
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <AddressInfoFields touched={touched} errors={errors} />
                                </>
                            ),
                        },
                        {
                            label: 'Dependientes',
                            component: (
                                <>
                                    <Typography variant="h6" gutterBottom>
                                        Dependientes
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />

                                    <Typography variant="body2" color="text.secondary" mb={2}>
                                        Aquí se listarán los dependientes asociados al socio.
                                    </Typography>

                                    <Box display="flex" justifyContent="flex-end" mb={2}>
                                        <Button variant="contained" size="small">
                                            Agregar Dependiente
                                        </Button>
                                    </Box>

                                    <Paper
                                        sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            bgcolor: 'grey.50',
                                            border: '1px dashed',
                                            borderColor: 'grey.300',
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            Tabla de dependientes pendiente de implementación.
                                        </Typography>
                                    </Paper>
                                </>
                            ),
                        },
                    ];

                    return (
                        <Form>
                            <Paper sx={{ mb: 3 }}>
                                <Tabs
                                    value={activeTab}
                                    onChange={handleTabChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                >
                                    {tabsConfig.map((tab, index) => (
                                        <Tab key={index} label={tab.label} />
                                    ))}
                                </Tabs>
                            </Paper>

                            <Paper sx={{ p: 3, mb: 3 }}>
                                {tabsConfig[activeTab].component}
                            </Paper>

                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button type="submit" variant="contained">
                                    Guardar Cambios
                                </Button>
                            </Box>
                        </Form>
                    );
                }}
            </Formik>
        </Box>
    );
};

export default SocioDetailPage;