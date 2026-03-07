import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Divider,
    CircularProgress,
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
import SocioDetailHeader from '../components/SocioDetailHeader';
import WaterLineActionPanel, { WaterTakeState } from '../components/water-line/WaterLineActionPanel';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastNotifications';
import DependentPage from '../components/dependents/Dependent';
import { buildFullName } from '../../../../utils/displayValue';

const socioService = new SocioService();

const SocioDetailPage: React.FC = () => {
    const { uid } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState<SocioResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [panelOpen, setPanelOpen] = useState(false);
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

    const fullName = buildFullName(
        data.user.name,
        data.profile.lastName,
        data.profile.secondLastName
    );

    const mappedWaterTake: WaterTakeState =
        data.waterTake?.waterTakeId
            ? {
                status: 'assigned',
                waterTakeId: data.waterTake.waterTakeId,
                waterLineId: data.waterTake.waterLineId!,
                waterLineName: data.waterTake.waterLineName!,
                isSuspended: data.waterTake.isSuspended!,
            }
            : {
                status: 'empty',
                isSuspended: data.waterTake.isSuspended!,
            };
    return (
        <Box p={3}>
            {/* HEADER */}
            <SocioDetailHeader
                data={data}
                fullName={fullName}
                onBack={handleBack}
                onWaterLineAction={() => setPanelOpen(true)}
            />
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
                            component: <DependentPage />,
                        }
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
            <WaterLineActionPanel
                open={panelOpen}
                onClose={() => setPanelOpen(false)}
                socioUid={data.user.uid}
                waterTake={mappedWaterTake}
                onSuccess={async () => {
                    if (!uid) {
                        showErrorToast('Unexpected error');
                        return;
                    }

                    const response: SocioDetailResponse = await socioService.edit(uid);
                    setData(response.data);
                    showSuccessToast("Acción realizada exitosamente!");
                }}
            />
        </Box>

    );
};

export default SocioDetailPage;