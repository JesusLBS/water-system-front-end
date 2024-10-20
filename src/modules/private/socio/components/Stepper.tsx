import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, TextField, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { roles } from '../mockData/mockData';

interface StepperProps {
    onSubmit: (data: any) => void;
}

const steps = ['User Info', 'Profile Info', 'Address Info'];

const validationSchemas = [
    Yup.object({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Name must be at least 2 characters'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        roleId: Yup.string().required('Role is required'),
    }),
    Yup.object({
        lastName: Yup.string()
            .required('Last name is required')
            .min(2, 'Last name must be at least 2 characters'),
        secondLastName: Yup.string()
            .required('Second Last Name is required')
            .min(2, 'Second Last Name must be at least 2 characters'),
        mobile: Yup.string()
            .required('Mobile is required')
            .matches(/^[0-9]+$/, 'Mobile must contain only digits')
            .min(10, 'Mobile number must be at least 10 digits')
            .max(15, 'Mobile number cannot exceed 15 digits'),
        birthdate: Yup.date()
            .required('Birthdate is required')
            .max(new Date(), 'Birthdate cannot be in the future')
            .nullable(),
    }),
    Yup.object({
        address: Yup.string()
            .required('Address is required')
            .min(5, 'Address must be at least 5 characters'),
        city: Yup.string()
            .required('City is required')
            .min(2, 'City must be at least 2 characters'),
    })
];

const FormStepper: React.FC<StepperProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        userData: { name: '', email: '', roleId: '' },
        profileData: { lastName: '', secondLastName: '', mobile: '', birthdate: '' },
        addressData: { address: '', city: '' },
    });

    const [activeStep, setActiveStep] = useState(0);

    const isLastStep = activeStep === steps.length - 1;
    const cleanData = (data: any) => {
        return {
            userData: {
                name: data.userData.name,
                email: data.userData.email,
                roleId: data.userData.roleId,
            },
            profileData: {
                lastName: data.profileData.lastName,
                secondLastName: data.profileData.secondLastName,
                mobile: data.profileData.mobile,
                birthdate: data.profileData.birthdate,
            },
            addressData: {
                address: data.addressData.address,
                city: data.addressData.city,
            },
        };
    };

    const handleNext = (values: any) => {
        const updatedData = {
            ...formData,
            ...(activeStep === 0 && { userData: { ...values } }),
            ...(activeStep === 1 && { profileData: { ...values } }),
            ...(activeStep === 2 && { addressData: { ...values } }),
        };

        setFormData(updatedData);


        if (isLastStep) {
            const cleanedData = cleanData(updatedData);
            onSubmit(cleanedData);
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const renderFormFields = (stepIndex: number, touched: any, errors: any) => {
        switch (stepIndex) {
            case 0:
                return (
                    <>
                        <Field
                            as={TextField}
                            name="name"
                            label="Name"
                            fullWidth
                            margin="normal"
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />
                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            margin="normal"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <Field
                            as={TextField}
                            name="roleId"
                            label="Role"
                            select
                            fullWidth
                            margin="dense"
                            error={touched.roleId && Boolean(errors.roleId)}
                            helperText={touched.roleId && errors.roleId}
                        >
                            <MenuItem value="" disabled>
                                Select role
                            </MenuItem>
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.description.charAt(0).toUpperCase() + role.description.slice(1)}
                                </MenuItem>
                            ))}
                        </Field>
                    </>
                );
            case 1:
                return (
                    <>
                        <Field
                            as={TextField}
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            margin="normal"
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        />
                        <Field
                            as={TextField}
                            name="secondLastName"
                            label="Second Last Name"
                            fullWidth
                            margin="normal"
                            error={touched.secondLastName && Boolean(errors.secondLastName)}
                            helperText={touched.secondLastName && errors.secondLastName}
                        />
                        <Field
                            as={TextField}
                            name="mobile"
                            label="Mobile"
                            fullWidth
                            margin="normal"
                            type="number"
                            min="10"
                            error={touched.mobile && Boolean(errors.mobile)}
                            helperText={touched.mobile && errors.mobile}
                        />

                        <Field
                            as={TextField}
                            name="birthdate"
                            label="Birthdate"
                            fullWidth
                            margin="normal"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            error={touched.birthdate && Boolean(errors.birthdate)}
                            helperText={touched.birthdate && errors.birthdate}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <Field
                            as={TextField}
                            name="address"
                            label="Address"
                            fullWidth
                            margin="normal"
                            error={touched.address && Boolean(errors.address)}
                            helperText={touched.address && errors.address}
                        />
                        <Field
                            as={TextField}
                            name="city"
                            label="City"
                            fullWidth
                            margin="normal"
                            error={touched.city && Boolean(errors.city)}
                            helperText={touched.city && errors.city}
                        />
                    </>
                );
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

            {<Formik
                enableReinitialize
                initialValues={{
                    ...formData.userData,
                    ...formData.profileData,
                    ...formData.addressData,
                }}
                validationSchema={validationSchemas[activeStep]}
                onSubmit={handleNext}
            >
                {({ touched, errors }) => (
                    <Form>
                        {renderFormFields(activeStep, touched, errors)}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            <Button type="submit">
                                {isLastStep ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>}

        </Box>
    );
};
export default FormStepper;
