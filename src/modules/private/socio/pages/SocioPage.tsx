import React, { useEffect, useMemo } from 'react';
import SocioService from '../services/socioService';
import { useSocios } from '../hooks/useSocios';
import { IndexQueryParams } from '../../../../interfaces/shared/index-params.interface';
import { SocioRow, SociosResponse } from '../interfaces/socio.interface';
import { ReusableStatsCards } from '../../../../shared/components/ReusableStatsCards';
import SocioTable from '../components/SocioTable';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { DialogActionKey } from '../interfaces/actionTypes.config.interface';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastNotifications';
import FormDialog from '../components/FomDialog';

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

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const generateUid = (length = 16) =>
        Math.random().toString(36).substring(2, 2 + length);

    const refreshTable = () => {
        setTableState(prev => ({
            ...prev,
            pagination: { ...prev.pagination }
        }));
    };

    const handleFormSubmit = async (values: any, isEdit: boolean) => {
        try {
            const payload = {
                ...values,
                userData: {
                    ...values.userData,
                    uid: generateUid()
                }
            }
            //console.log('Payload:');
            //console.log(JSON.stringify(payload, null, 2));
            const response = isEdit
                ? await socioService.update(payload)
                : await socioService.store({ ...payload });

            if (!response.ok) {
                showErrorToast(
                    isEdit
                        ? 'No se pudo actualizar el socio'
                        : 'No se pudo crear el socio'
                );
                return;
            }

            showSuccessToast(
                isEdit
                    ? 'Socio actualizado correctamente'
                    : 'Socio creado correctamente'
            );

            setOpenDialog(false);
            refreshTable();
        } catch (error) {
            console.error(error);
            showErrorToast('Error inesperado al guardar el socio');
        }
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

            <FormDialog
                openDialog={openDialog}
                onClose={handleCloseDialog}
                isEdit={false}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};
export default SocioPage;
