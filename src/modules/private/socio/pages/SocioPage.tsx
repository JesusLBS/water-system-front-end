import React, { useEffect, useMemo, useState } from 'react';
import SocioService from '../services/socioService';
import { useSocios } from '../hooks/useSocios';
import { IndexQueryParams } from '../../../../interfaces/shared/index-params.interface';
import { SocioRow, SociosResponse } from '../interfaces/socio.interface';
import { ReusableStatsCards } from '../../../../shared/components/ReusableStatsCards';
import SocioTable from '../components/SocioTable';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { DialogActionKey } from '../interfaces/actionTypes.config.interface';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastNotifications';

const socioService = new SocioService();

const SocioPage: React.FC = () => {
    const {
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
    } = useSocios();

    // Debounce search
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(tableState.search.trim()), 500);
        return () => clearTimeout(t);
    }, [tableState.search]);

    const apiParams: IndexQueryParams = useMemo(() => {
        const sortEntry = tableState.sort[0];

        return {
            limit: tableState.pagination.pageSize,
            page: tableState.pagination.page + 1, // API is 1-based
            sort: sortEntry?.field ?? 'createdAt',
            direction: sortEntry?.sort ?? 'desc',
            withTrashed: tableState.withTrashed,
            search: debouncedSearch || '',
        };
    }, [tableState.pagination, tableState.sort, tableState.withTrashed, debouncedSearch]);

    useEffect(() => {
        let mounted = true;
        async function fetchSocios() {
            setLoading(true);
            try {
                const response: SociosResponse = await socioService.index(apiParams);
                if (!mounted) return;
                setSocios(response.data.rows);
                setMeta(response.data.meta);
            } catch (error) {
                console.error('Error fetching socios:', error);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchSocios();
        return () => { mounted = false; };
    }, [apiParams]);

    const actionHandlers: Record<
        DialogActionKey,
        (uid: string) => Promise<boolean>
    > = {
        Deactivate: async (uid) => {
            return await socioService.deactivate({ dataId: uid });
        },
        Activate: async (uid) => {
            return await socioService.activate({ dataId: uid });
        },
        Delete: async (uid) => {
            return await socioService.delete({ dataId: uid });
        },
    };

    const successMessages: Record<DialogActionKey, string> = {
        Deactivate: 'User deactivated successfully',
        Activate: 'User activated successfully',
        Delete: 'User deleted successfully',
    };

    const handlePaginationModelChange = (pagination: GridPaginationModel) => {
        setTableState(prev => ({ ...prev, pagination }));
    };

    const handleSortModelChange = (sort: GridSortModel) => {
        setTableState(prev => ({ ...prev, sort }));
    };

    const handleSearchChange = (search: string) => {
        setTableState(prev => ({ ...prev, search }));
    };

    const handleWithTrashedChange = (withTrashed: string) => {
        setTableState(prev => ({ ...prev, withTrashed }));
    };

    const handleOpenDialog = () => setOpenDialog(true);

    const handleFormSubmit = (data: any) => { /* lógica para submit */ };

    const refreshTable = () => {
        setTableState(prev => ({
            ...prev,
            pagination: { ...prev.pagination }
        }));
    };

    const handleOnConfirm = async (
        action: DialogActionKey | null,
        item: SocioRow
    ): Promise<void> => {
        if (!action) return;

        try {
            const success = await actionHandlers[action](item.uid);

            if (!success) {
                showErrorToast('Operation failed');
                return;
            }

            showSuccessToast(successMessages[action]);
            refreshTable();
        } catch (error) {
            console.error(error);
            showErrorToast('Unexpected error');
        }
    };

    return (
        <div>
            <ReusableStatsCards meta={meta} label="Socios" />
            <SocioTable
                socios={socios}
                total={meta?.filtered || 0}
                paginationModel={tableState.pagination}
                onPaginationModelChange={handlePaginationModelChange}
                sortModel={tableState.sort}
                onSortModelChange={handleSortModelChange}
                onRowClick={(row) => console.log('row clicked', row)}
                loading={loading}
                search={tableState.search}
                withTrashed={tableState.withTrashed}
                onSearchChange={handleSearchChange}
                onWithTrashedChange={handleWithTrashedChange}
                onAdd={handleOpenDialog}
                onEditSubmit={handleFormSubmit}
                onConfirm={handleOnConfirm}
            />
        </div>
    );
};
export default SocioPage;
