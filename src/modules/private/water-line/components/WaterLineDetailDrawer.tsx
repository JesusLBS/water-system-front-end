import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Divider,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import waterLineService from '../services/water-lineService';
import { WaterTakeRow, WaterTakeByLineResponse } from '../interfaces/water-line';

interface Props {
    id: number;
    onClose: () => void;
}

const WaterTakeTable: React.FC<{ rows: WaterTakeRow[] }> = ({ rows }) => {
    const navigate = useNavigate();

    const goToSocio = (uid: string) => {
        navigate(`/private/socios/detail/${uid}?from=water-line`);
    };

    return (
        <Box>
            {rows.map((item) => (
                <Box
                    key={item.id}
                    display="flex"
                    flexDirection="column"
                    py={1.5}
                    borderBottom="1px solid #eee"
                >
                    <Box display="flex" justifyContent="space-between">
                        <Box>
                            <Typography fontWeight={500}>
                                {item.socioName}
                            </Typography>

                            <Typography variant="caption">
                                UID: {item.uid}
                            </Typography>
                        </Box>

                        <Box textAlign="right">
                            <Typography variant="body2">
                                {item.status}
                            </Typography>

                            <Typography variant="caption">
                                Dependents: {item.dependentsCount}
                            </Typography>
                        </Box>
                    </Box>

                    <Box mt={1}>
                        <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            onClick={() => goToSocio(item.uid)}
                        >
                            Ver detalle
                        </Button>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

const WaterLineDetailDrawer: React.FC<Props> = ({ id }) => {
    const [data, setData] = useState<WaterTakeByLineResponse['data'] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await waterLineService.waterTakeByLine(id);
                setData(res.data);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (!data) {
        return <Typography>No data</Typography>;
    }

    return (
        <Box p={2}>
            <Typography variant="h6">
                Water Line Detail
            </Typography>

            <Typography variant="body2">
                Total: {data.count}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <WaterTakeTable rows={data.rows} />
        </Box>
    );
};

export default WaterLineDetailDrawer;