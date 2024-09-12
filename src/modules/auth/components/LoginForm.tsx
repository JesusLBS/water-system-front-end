import React, { useState } from 'react';
import { TextField, Button, Box, Link, Stack, IconButton, InputAdornment, Typography } from '@mui/material';
import { Visibility, VisibilityOff, Email } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Esquema de validación con Yup
const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Required'),
});

interface LoginFormProps {
    onSubmit: (credentials: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Formik
            initialValues={{ email: 'chichohdzjesus@gmail.com', password: '123456' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            {({ errors, touched, handleChange, handleBlur }) => (
                <Form>
                    <Box sx={{ mt: 3 }}>
                        <Field
                            as={TextField}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                ),
                            }}
                            tabIndex={0}
                        />
                        <Field
                            as={TextField}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Stack direction="row" justifyContent="space-between">
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            <Link href="/auth/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Stack>
                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                or
                            </Typography>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<GoogleIcon />}
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    '& span': {
                                        display: { xs: 'none', sm: 'flex' },
                                    },
                                    '& .MuiButton-startIcon': {
                                        display: 'flex'
                                    }
                                }}
                            >
                                <span>Sign in with Google</span>
                            </Button>

                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
