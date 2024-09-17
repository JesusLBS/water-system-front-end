import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
} from '@mui/material';
import { roles } from '../mockData/mockData';

// Esquema de validación
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    roleId: Yup.string().required('Role is required'), // validación para roleId
    active: Yup.boolean().required('Active status is required'),
});

interface FormDialogProps {
    openDialog: boolean;
    onClose: () => void;
    isEdit: boolean;
    item?: { name: string; email: string; role: string };
}

const FormDialog: React.FC<FormDialogProps> = ({ openDialog, onClose, isEdit, item }) => {
    console.log(JSON.stringify(item, null, 2))
    const initialValues = isEdit
        ? {
            name: 'John Doe',
            email: 'john.doe@example.com',
            roleId: '1', // Valor inicial vacío
            active: true,
        }
        : {
            name: 'any',
            email: 'any@example.com',
            roleId: '', // Valor inicial vacío
            active: false,
        };

    const handleFormSubmit = (values: any) => {
        console.log('Form data:', values);
        onClose();
    };

    return (
        <Dialog open={openDialog} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        <DialogContent>
                            <Field
                                as={TextField}
                                name="name"
                                label="Name"
                                fullWidth
                                margin="dense"
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <Field
                                as={TextField}
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                margin="dense"
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />

                            {/* Select field for Role */}
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

                            {/* Radio button for Active/Inactive */}
                            <FormLabel component="legend">Status</FormLabel>
                            <RadioGroup
                                name="active"
                                value={values.active ? 'active' : 'inactive'}
                                onChange={(event) => setFieldValue('active', event.target.value === 'active')}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    padding: 2,
                                    flexDirection: {
                                        xs: 'column',
                                        sm: 'row',
                                    },
                                    gap: 2,
                                }}
                            >
                                <FormControlLabel value="active" control={<Radio />} label="Active" />
                                <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                            </RadioGroup>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="submit">{isEdit ? 'Save Changes' : 'Add User'}</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default FormDialog;
