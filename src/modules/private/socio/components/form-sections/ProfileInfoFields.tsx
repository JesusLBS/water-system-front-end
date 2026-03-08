import React from 'react';
import { TextField } from '@mui/material';
import { Field } from 'formik';
import Grid from '@mui/material/Grid2';

interface Props {
    touched: any;
    errors: any;
    disabled?: boolean;
}

const ProfileInfoFields: React.FC<Props> = ({ touched, errors, disabled }) => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    disabled={disabled}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                />
            </Grid>


            <Grid size={{ xs: 12, md: 6 }}>
                <Field
                    as={TextField}
                    name="secondLastName"
                    label="Second Last Name"
                    fullWidth
                    margin="normal"
                    disabled={disabled}
                    error={touched.secondLastName && Boolean(errors.secondLastName)}
                    helperText={touched.secondLastName && errors.secondLastName}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Field
                    as={TextField}
                    name="mobile"
                    label="Mobile"
                    fullWidth
                    margin="normal"
                    type="number"
                    disabled={disabled}
                    error={touched.mobile && Boolean(errors.mobile)}
                    helperText={touched.mobile && errors.mobile}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Field
                    as={TextField}
                    name="birthdate"
                    label="Birthdate"
                    fullWidth
                    margin="normal"
                    type="date"
                    disabled={disabled}
                    InputLabelProps={{ shrink: true }}
                    error={touched.birthdate && Boolean(errors.birthdate)}
                    helperText={touched.birthdate && errors.birthdate}
                />
            </Grid>

        </Grid>
    );
};

export default ProfileInfoFields;