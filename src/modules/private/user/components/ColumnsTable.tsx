import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

import { UserRow } from '../interfaces/user.interface';
import { MenuListButton } from './MenuListButton';
import { DialogActionKey } from '../interfaces/actionTypes.config.interface';

export const getColumnsTable = (
    onEditSubmit: (values: any, isEdit: boolean) => void,

    onConfirm: (action: DialogActionKey | null, item: UserRow) => Promise<void>
): GridColDef<UserRow>[] => [
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
        { field: 'role', headerName: 'Role', flex: 0.7, minWidth: 120 },
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
            field: 'createdAt', headerName: 'Creado', flex: 0.7, minWidth: 120,
        },
        {
            field: 'updatedAt', headerName: 'Actualizado', flex: 0.7, minWidth: 120,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            width: 120,
            renderCell: (params) => (
                <MenuListButton item={params.row} onEditSubmit={onEditSubmit} onConfirm={onConfirm} />
            ),
        },
    ];