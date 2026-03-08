import { useState } from 'react';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { SocioRow, SociosResponse } from '../interfaces/socio.interface';

export const useSocios = () => {
    const [socios, setSocios] = useState<SocioRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState<SociosResponse['data']['meta'] | null>(null);

    const [tableState, setTableState] = useState({
        pagination: { page: 0, pageSize: 10 } as GridPaginationModel,
        sort: [] as GridSortModel,
        search: '',
        withTrashed: 'active',
    });

    const [debouncedSearch, setDebouncedSearch] = useState(tableState.search);
    const [openDialog, setOpenDialog] = useState(false);

    return {
        socios,
        setSocios,
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
