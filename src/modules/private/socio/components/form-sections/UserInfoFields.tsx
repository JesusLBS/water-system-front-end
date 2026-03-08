import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { Field } from 'formik';
import { roles } from '../../mockData/mockData';
import Grid from '@mui/material/Grid2';

interface Props {
    touched: any;
    errors: any;
    disabled?: boolean;
}

const UserInfoFields: React.FC<Props> = ({ touched, errors, disabled }) => {
    return (
        <Grid container spacing={2}>

            {/* Name */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Field
                    as={TextField}
                    name="name"
                    label="Name"
                    fullWidth
                    margin="normal"
                    disabled={disabled}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                />
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    margin="normal"
                    disabled={disabled}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                />
            </Grid>

            {/* Role */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Field
                    as={TextField}
                    name="roleId"
                    label="Role"
                    select
                    fullWidth
                    margin="normal"
                    disabled={disabled}
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
            </Grid>

        </Grid>
    );
};

export default UserInfoFields;