import React, { useEffect, useMemo, useState } from 'react';

import { useWaterLine } from '../hooks/useWaterLine';
import { IndexQueryParams } from '../../../../interfaces/shared/index-params.interface';
import { WaterLineRow, WaterLineResponse } from '../interfaces/water-line';
import { ReusableStatsCards } from '../../../../shared/components/ReusableStatsCards';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastNotifications';
import { useNavigate } from 'react-router-dom';
import waterLineService from '../services/water-lineService';
import { DialogActionKey } from '../interfaces/actionTypes.config.interface';
import FormDialog from '../components/FomDialog';
import WaterLineTable from '../components/WaterLineTable';
import { buildWaterLinePayload } from '../mappers/buildWaterLinePayload';

const WaterLinePage: React.FC = () => {
    const {
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
    } = useWaterLine();

    const [selectedItem, setSelectedItem] = React.useState<WaterLineRow | null>(null);
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
        async function fetchWaterLines() {
            setLoading(true);
            try {
                const response: WaterLineResponse = await waterLineService.index(apiParams);
                if (!mounted) return;
                setWaterLines(response.data.rows);
                setMeta(response.data.meta);
            } catch (error) {
                console.error('Error fetching water lines:', error);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchWaterLines();
        return () => { mounted = false; };
    }, [apiParams, reloadKey]);

    const actionHandlers: Record<
        DialogActionKey,
        (id: string) => Promise<boolean>
    > = {
        Deactivate: async (id) => {
            return await waterLineService.deactivate({ dataId: id });
        },
        Activate: async (id) => {
            return await waterLineService.activate({ dataId: id });
        }
    };

    const successMessages: Record<DialogActionKey, string> = {
        Deactivate: 'Water line deactivated successfully',
        Activate: 'Water line activated successfully'
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
            const payload = buildWaterLinePayload(values, {
                isEdit,
                id: selectedItem?.id
            });

            const response = isEdit
                ? await waterLineService.update(payload)
                : await waterLineService.store(payload);

            if (!response.ok) {
                showErrorToast(
                    isEdit
                        ? 'No se pudo actualizar la línea de agua'
                        : 'No se pudo crear la línea de agua'
                );
                return;
            }

            showSuccessToast(
                isEdit
                    ? 'Línea de agua actualizada correctamente'
                    : 'Línea de agua creada correctamente'
            );

            setOpenDialog(false);
            setReloadKey(prev => prev + 1);
        } catch (error) {
            showErrorToast('Error inesperado al guardar la línea de agua');
        }
    };

    const handleEdit = (item: WaterLineRow) => {
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
        item: WaterLineRow
    ): Promise<void> => {
        if (!action) return;

        try {
            const success = await actionHandlers[action](String(item.id));

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

    const handleDetail = (item: WaterLineRow) => {
        navigate(`/private/water-lines/detail/${item.id}`);
    };

    return (
        <div>
            <ReusableStatsCards meta={meta} label="Water Lines" />
            <WaterLineTable
                waterLines={waterLines}
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

export default WaterLinePage;