import React from 'react'
import { GridSortModel } from '@mui/x-data-grid'
import { DefaultRow, getDefaultColumns } from '../../../../../shared/components/DefaultColumns'
import ReusableTable from '../../../../../shared/components/ReusableTable'
import HeaderTable from '../../../../../shared/components/HeaderTable'

interface DependentTableProps {
    dependents: DefaultRow[]
    total: number

    paginationModel: { page: number; pageSize: number }
    onPaginationModelChange: (model: { page: number; pageSize: number }) => void

    sortModel: GridSortModel
    onSortModelChange: (model: GridSortModel) => void

    onRowClick?: (row: DefaultRow) => void
    loading?: boolean

    // header
    onAdd: () => void
    search: string
    withTrashed: string
    onSearchChange: (value: string) => void
    onWithTrashedChange: (value: string) => void

    // actions
    onEdit?: (item: DefaultRow) => void
    onDetail?: (item: DefaultRow) => void
}

const DependentTable: React.FC<DependentTableProps> = ({
    dependents,
    total,
    paginationModel,
    onPaginationModelChange,
    sortModel,
    onSortModelChange,
    onRowClick,
    loading = false,

    onAdd,
    search,
    withTrashed,
    onSearchChange,
    onWithTrashedChange,

    onEdit,
    onDetail,
}) => {

    const columns = React.useMemo(
        () => getDefaultColumns(onEdit, onDetail),
        [onEdit, onDetail]
    )

    return (
        <div>
            <HeaderTable
                search={search}
                withTrashed={withTrashed}
                onSearchChange={onSearchChange}
                onWithTrashedChange={onWithTrashedChange}
                onAdd={onAdd}
                addLabel="Add Dependent"
            />

            <ReusableTable<DefaultRow>
                rows={dependents}
                columns={columns}
                rowCount={total}
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}
                sortModel={sortModel}
                onSortModelChange={onSortModelChange}
                onRowClick={onRowClick}
                loading={loading}
                checkboxSelection
            />
        </div>
    )
}

export default DependentTable