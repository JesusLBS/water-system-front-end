import React from 'react';
import { Container, CssBaseline, Box, IconButton, Card, CardContent, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    toggleTheme: () => void;
    darkMode: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, toggleTheme, darkMode }) => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <IconButton
                onClick={toggleTheme}
                sx={{ position: 'fixed', top: 16, right: 16 }}
            >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <Box
                sx={{
                    marginTop: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Card sx={{ width: '100%', padding: 2, boxShadow: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: 'background.paper',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e0e0e0',
                            }}
                        >
                            <Typography variant="h5" component="h1" align="center" gutterBottom>
                                {title}
                            </Typography>
                        </Box>
                        {children}
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default AuthLayout;
