import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import { DialogActionKey } from '../interfaces/actionTypes.config.interface';
import { SocioRow } from '../interfaces/socio.interface';
import { MenuListButton } from './MenuListButton';

export const getColumnsTable = (
    onEdit: (item: SocioRow) => void,
    onConfirm: (action: DialogActionKey, item: SocioRow) => Promise<void>,
    onDetail: (item: SocioRow) => void
): GridColDef<SocioRow>[] => [
        {
            field: 'uid',
            headerName: 'UUID',
            flex: 1,
            minWidth: 120,
            renderCell: (params) => {
                const value = params.value as string;
                const short = value ? value.slice(0, 8) : '';

                return (
                    <span title={value}>
                        <strong>{short}</strong>
                    </span>
                );
            },
        },
        { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 150 },
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
        { field: 'totalDependents', headerName: 'Dependents', flex: 0.7, minWidth: 120 },
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
                <MenuListButton
                    item={params.row}
                    onEdit={onEdit}
                    onDetail={onDetail}
                    onConfirm={onConfirm}
                />
            ),
        },
    ];