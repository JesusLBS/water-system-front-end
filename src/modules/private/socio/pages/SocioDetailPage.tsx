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

    const fullName = `${data.userData.name} ${data.profileData.lastName} ${data.profileData.secondLastName}`;

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
                            {data.userData.name
                                ? data.userData.name.charAt(0).toUpperCase()
                                : <PersonPinCircleOutlined />}
                        </Avatar>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h5" fontWeight={600}>
                            {fullName}
                        </Typography>

                        <Box mt={1} display="flex" gap={2} flexWrap="wrap">
                            <Chip
                                label={`UID: ${data.userData.uid.slice(0, 8)}`}
                                size="small"
                                variant="outlined"
                            />
                            <Chip
                                label="Línea de Agua: No asignada"
                                size="small"
                                color="warning"
                            />
                        </Box>
                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 4 }}
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'space-between', md: 'flex-end' },
                            alignItems: 'center',
                            gap: 4,
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box display="flex" gap={4}>
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Edad
                                </Typography>
                                <Typography variant="h6" fontWeight={700}>
                                    {data.profileData.age}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Dependientes
                                </Typography>
                                <Typography variant="h6" fontWeight={700}>
                                    {data.profileData.totalDependents}
                                </Typography>
                            </Box>
                        </Box>

                        <Button variant="contained" size="small" onClick={handleBack}>
                            Regresar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* FORM + TABS */}
            <Formik
                enableReinitialize
                initialValues={{
                    ...data.userData,
                    ...data.profileData,
                    ...data.addressData,
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