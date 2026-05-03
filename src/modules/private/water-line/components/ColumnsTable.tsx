import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import { DialogActionKey } from '../interfaces/actionTypes.config.interface';
import { WaterLineRow } from '../interfaces/water-line';
import { MenuListButton } from './MenuListButton';

export const getColumnsTable = (
    onEdit: (item: WaterLineRow) => void,
    onConfirm: (action: DialogActionKey, item: WaterLineRow) => Promise<void>,
    onDetail: (item: WaterLineRow) => void
): GridColDef<WaterLineRow>[] => [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5,
            minWidth: 80,
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'status',
            headerName: 'Status',
            sortable: false,
            flex: 0.6,
            minWidth: 110,
            renderCell: (params) =>
                params.value === 'active' ? (
                    <Chip label="Active" color="success" size="small" />
                ) : (
                    <Chip label="Inactive" variant="outlined" size="small" />
                ),
        },
        {
            field: 'createdAt',
            headerName: 'Created',
            flex: 0.7,
            minWidth: 140,
        },
        {
            field: 'updatedAt',
            headerName: 'Updated',
            flex: 0.7,
            minWidth: 140,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            width: 120,
            renderCell: (params) => (
                <MenuListButton
                    item={params.row}
                    onEdit={onEdit}
                    onDetail={onDetail}
                    onConfirm={onConfirm}
                />
            ),
        },
    ];