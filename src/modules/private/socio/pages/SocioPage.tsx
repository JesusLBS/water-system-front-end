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
import FormDialog from '../components/FomDialog';
import { buildSocioPayload } from '../mappers/socioPayload.mapper';
import { generateUid } from '../../../../utils/generateUid';
import { useNavigate } from 'react-router-dom';

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

    const [selectedItem, setSelectedItem] = React.useState<SocioRow | null>(null);
    const [isEdit, setIsEdit] = React.useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(tableState.search.trim()), 500);
        return () => clearTimeout(t);
    }, [tableState.search]);

    const apiParams: IndexQueryParams = useMemo(() => {
        const sortEntry = tableState.sort[0];

        return {
            limit: tableState.pagination.pageSize,
            page: tableState.pagination.page + 1,
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
    }, [apiParams, reloadKey]);

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

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleFormSubmit = async (values: any, isEdit: boolean) => {
        try {
            const payload = buildSocioPayload(values, {
                isEdit,
                uid: selectedItem?.uid,
                generateUid
            });
            //console.log(JSON.stringify(payload, null, 2));
            const response = isEdit
                ? await socioService.update(payload)
                : await socioService.store(payload);

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
            setReloadKey(prev => prev + 1);
        } catch (error) {
            showErrorToast('Error inesperado al guardar el socio');
        }
    };

    const handleEdit = (item: SocioRow) => {
        setSelectedItem(item);
        setIsEdit(true);
        setOpenDialog(true);
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setIsEdit(false);
        setOpenDialog(true);
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
            setReloadKey(prev => prev + 1);
        } catch (error) {
            showErrorToast('Unexpected error');
        }
    };

    const navigate = useNavigate();

    const handleDetail = (item: SocioRow) => {
        navigate(`/private/socios/detail/${item.uid}`);
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
                onAdd={handleCreate}
                onEdit={handleEdit}
                onConfirm={handleOnConfirm}
                onDetail={handleDetail}
            />
            <FormDialog
                openDialog={openDialog}
                onClose={handleCloseDialog}
                isEdit={isEdit}
                item={selectedItem ?? undefined}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};
export default SocioPage;
