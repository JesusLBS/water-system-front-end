import React from 'react';
import { TextField } from '@mui/material';
import { Field } from 'formik';
import Grid from '@mui/material/Grid2';

interface Props {
    touched: any;
    errors: any;
    disabled?: boolean;
}

const AddressInfoFields: React.FC<Props> = ({ touched, errors, disabled }) => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Field
                    as={TextField}
                    name="address"
                    label="Address"
                    fullWidth
                    margin="normal"
                    disabled={disabled}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    margin="normal"
                    disabled={disabled}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                />
            </Grid>
        </Grid>
    );
};

export default AddressInfoFields;