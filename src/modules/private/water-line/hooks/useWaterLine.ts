import { useState } from 'react';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { WaterLineResponse, WaterLineRow } from '../interfaces/water-line';

export const useWaterLine = () => {
    const [waterLines, setWaterLines] = useState<WaterLineRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState<WaterLineResponse['data']['meta'] | null>(null);

    const [tableState, setTableState] = useState({
        pagination: { page: 0, pageSize: 10 } as GridPaginationModel,
        sort: [] as GridSortModel,
        search: '',
        withTrashed: 'active',
    });

    const [debouncedSearch, setDebouncedSearch] = useState(tableState.search);
    const [openDialog, setOpenDialog] = useState(false);

    return {
        waterLines,
        setWaterLines,
        loading,
        setLoading,
        meta,
        setMeta,
        tableState,
        setTableState,
        debouncedSearch,
        setDebouncedSearch,
        openDialog,
        setOpenDialog,
    };
};