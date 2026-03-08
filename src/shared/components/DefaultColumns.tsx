import { GridColDef } from '@mui/x-data-grid'
import { Chip } from '@mui/material'

export interface DefaultRow {
  uid: string
  name: string
  status: string
  createdAt: string
  updatedAt: string
}

export const getDefaultColumns = (
  onEdit?: (item: DefaultRow) => void,
  onDetail?: (item: DefaultRow) => void
): GridColDef<DefaultRow>[] => [
    {
      field: 'uid',
      headerName: 'ID',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.6,
      minWidth: 120,
      sortable: false,
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
      flex: 0.8,
      minWidth: 140,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated',
      flex: 0.8,
      minWidth: 140,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => {
        const item = params.row

        return (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => onDetail?.(item)}>View</button>
            <button onClick={() => onEdit?.(item)}>Edit</button>
          </div>
        )
      },
    },
  ]