import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { generateMockFormData } from '../mockData/mockGenerator';
import UserInfoFields from './form-sections/UserInfoFields';
import ProfileInfoFields from './form-sections/ProfileInfoFields';
import AddressInfoFields from './form-sections/AddressInfoFields';

interface StepperProps {
    mode: 'create' | 'edit';
    initialData?: any;
    onSubmit: (data: any) => void;
}

const steps = ['User Info', 'Profile Info', 'Address Info'];
const useMock = import.meta.env.VITE_USE_MOCK === 'true';

const validationSchemas = [
    Yup.object({
        name: Yup.string().required().min(2),
        email: Yup.string().email().required(),
        roleId: Yup.string().required(),
    }),
    Yup.object({
        lastName: Yup.string().required().min(2),
        secondLastName: Yup.string().required().min(2),
        mobile: Yup.string().required().min(10).max(15),
        birthdate: Yup.date().required().max(new Date()).nullable(),
    }),
    Yup.object({
        address: Yup.string().required().min(5),
        city: Yup.string().required().min(2),
    }),
];

const emptyData = {
    user: { name: '', email: '', roleId: '' },
    profile: { lastName: '', secondLastName: '', mobile: '', birthdate: '' },
    address: { address: '', city: '' },
};

const FormStepper: React.FC<StepperProps> = ({
    mode,
    initialData,
    onSubmit,
}) => {
    const [formData, setFormData] = useState(() => {
        if (mode === 'edit' && initialData) return initialData;
        if (mode === 'create' && useMock) return generateMockFormData();
        return emptyData;
    });

    const [activeStep, setActiveStep] = useState(0);
    const isLastStep = activeStep === steps.length - 1;

    const cleanData = (data: any) => ({
        userData: { ...data.user },
        profileData: { ...data.profile },
        addressData: { ...data.address },
    });

    const handleNext = (values: any) => {
        const updatedData = {
            ...formData,
            ...(activeStep === 0 && { user: { ...values } }),
            ...(activeStep === 1 && { profile: { ...values } }),
            ...(activeStep === 2 && { address: { ...values } }),
        };

        setFormData(updatedData);

        if (isLastStep) {
            onSubmit(cleanData(updatedData));
        } else {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const renderStepContent = (step: number, touched: any, errors: any) => {
        switch (step) {
            case 0:
                return <UserInfoFields touched={touched} errors={errors} />;
            case 1:
                return <ProfileInfoFields touched={touched} errors={errors} />;
            case 2:
                return <AddressInfoFields touched={touched} errors={errors} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Formik
                enableReinitialize
                initialValues={{
                    ...formData.user,
                    ...formData.profile,
                    ...formData.address,
                }}
                validationSchema={validationSchemas[activeStep]}
                onSubmit={handleNext}
            >
                {({ touched, errors }) => (
                    <Form>
                        {renderStepContent(activeStep, touched, errors)}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>

                            <Button type="submit">
                                {isLastStep ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default FormStepper;