import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, CircularProgress, Stack, Chip } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { createDependentService } from "./services/dependentService";
import { DependentRow, DependentsResponse } from "./interfaces/dependent.interface";
import { useDependents } from "./hooks/useDependent";
import DependentList from "./components/DependentList";
import DependentForm from "./components/DependentForm";
import { Meta } from "../../../../../interfaces/shared/index.interface";
import { delay } from "../../../../../utils/async";

interface Props {
    uid: string;
}

const DependentPage: React.FC<Props> = ({ uid }) => {

    const {
        dependents,
        setDependents,
        loading,
        setLoading,
        selected,
        setSelected,
    } = useDependents();

    const [meta, setMeta] = useState<Meta | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {

        const fetchDependents = async () => {
            setLoading(true);

            try {

                const response: DependentsResponse =
                    await createDependentService(uid).index({});

                setDependents(response.data.rows);
                setMeta(response.data.meta);

            } finally {
                await delay();
                setLoading(false);
            }
        };

        fetchDependents();

    }, [uid, reloadKey]);

    const handleSelect = (item: DependentRow) => {
        setSelected(item);
    };

    const handleCreate = () => {
        setSelected(null);
    };

    const handleSaved = () => {
        setSelected(null);
        setReloadKey((prev) => prev + 1);
    };

    return (
        <Box>

            <Typography variant="h6" gutterBottom>
                Dependientes
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="body2" color="text.secondary" mb={2}>
                Gestiona los dependientes asociados al socio.
            </Typography>

            {meta && (
                <Stack
                    direction="row"
                    spacing={2}
                    mb={2}
                    flexWrap="wrap"
                    useFlexGap
                >
                    <Chip label={`Total: ${meta.total}`} />
                    <Chip color="success" label={`Activos: ${meta.active}`} />
                    <Chip color="default" label={`Inactivos: ${meta.inactive}`} />
                </Stack>
            )}

            {loading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="300px"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <DependentList
                            dependents={dependents}
                            onSelect={handleSelect}
                            onCreate={handleCreate}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <DependentForm
                            socioUid={uid}
                            dependent={selected}
                            onSaved={handleSaved}
                        />
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default DependentPage;