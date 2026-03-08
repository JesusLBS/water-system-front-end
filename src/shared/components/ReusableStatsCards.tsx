import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, useMediaQuery, useTheme } from '@mui/material';

export const ReusableStatsCards = ({ meta, label }: { meta: any, label: string }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!meta) return null;

    if (isMobile) {
        return (
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="body2" mb={1}>
                        {label}
                    </Typography>

                    <Grid container spacing={1}>
                        <Grid size={4}>
                            <Typography variant="caption" color="text.secondary">
                                Total
                            </Typography>
                            <Typography variant="h6">
                                {meta.total}
                            </Typography>
                        </Grid>

                        <Grid size={4}>
                            <Typography variant="caption" color="text.secondary">
                                Active
                            </Typography>
                            <Typography variant="h6" color="success.main">
                                {meta.active}
                            </Typography>
                        </Grid>

                        <Grid size={4}>
                            <Typography variant="caption" color="text.secondary">
                                Inactive
                            </Typography>
                            <Typography variant="h6" color="error.main">
                                {meta.inactive}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        );
    }

    return (
        <Grid container spacing={2} mb={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="body2">Total</Typography>
                        <Typography variant="h5">{meta.total}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="body2">Active</Typography>
                        <Typography variant="h5" color="success.main">
                            {meta.active}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="body2">Inactive</Typography>
                        <Typography variant="h5" color="error.main">
                            {meta.inactive}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};
