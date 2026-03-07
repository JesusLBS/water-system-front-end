import React, { useState } from 'react'
import { Box, Typography, Divider } from '@mui/material'
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import { DefaultRow } from '../../../../../shared/components/DefaultColumns'
import DependentTable from './DependentTable'

const DependentPage: React.FC = () => {

    const [dependents] = useState<DefaultRow[]>([])

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    })

    const [sortModel, setSortModel] = useState<GridSortModel>([])

    const [search, setSearch] = useState('')
    const [withTrashed, setWithTrashed] = useState('')

    const handleAdd = () => {
        console.log('add dependent')
    }

    const handleEdit = (item: DefaultRow) => {
        console.log('edit', item)
    }

    const handleDetail = (item: DefaultRow) => {
        console.log('detail', item)
    }

    const handleSearchChange = (value: string) => {
        setSearch(value)
    }

    const handleWithTrashedChange = (value: string) => {
        setWithTrashed(value)
    }

    return (
        <Box>

            <Typography variant="h6" gutterBottom>
                Dependientes
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="body2" color="text.secondary" mb={2}>
                Aquí se listarán los dependientes asociados al socio.
            </Typography>

            <DependentTable
                dependents={dependents}
                total={dependents.length}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                sortModel={sortModel}
                onSortModelChange={setSortModel}
                onRowClick={(row) => console.log('row clicked', row)}
                search={search}
                withTrashed={withTrashed}
                onSearchChange={handleSearchChange}
                onWithTrashedChange={handleWithTrashedChange}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDetail={handleDetail}
            />

        </Box>
    )
}

export default DependentPage