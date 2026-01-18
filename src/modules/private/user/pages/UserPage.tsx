import React, { useEffect, useMemo, useState } from 'react';

import { UserRow, UsersResponse } from '../interfaces/user.interface';
import UserService from '../services/userService';
import { GridSortModel, GridPaginationModel } from '@mui/x-data-grid';
import { IndexQueryParams } from '../../../../interfaces/shared/index-params.interface';
import UsersTable from '../components/UserTable';
import FormDialog from '../components/FomDialog';

/**
 * UserPage (container) - controls pagination, sorting, search and calls API.
 */
const userService = new UserService();

const UserPage: React.FC = () => {
    const [users, setUsers] = useState<UserRow[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    // DataGrid paginationModel is { page, pageSize } (page is 0-based)
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });

    // sortModel example: [{ field: 'name', sort: 'asc' }]
    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    // search and withTrashed controls
    const [search, setSearch] = useState<string>('');
    const [withTrashed, setWithTrashed] = useState<string>('active');

    // Debounce search
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search.trim()), 500);
        return () => clearTimeout(t);
    }, [search]);

    const apiParams: IndexQueryParams = useMemo(() => {
        const sortEntry = sortModel[0];

        return {
            limit: paginationModel.pageSize,
            page: paginationModel.page + 1, // API is 1-based
            sort: sortEntry?.field ?? 'createdAt',
            direction: sortEntry?.sort ?? 'desc',
            withTrashed,
            search: debouncedSearch || '',
        };
    }, [paginationModel, sortModel, withTrashed, debouncedSearch]);


    useEffect(() => {
        let mounted = true;
        async function fetchUsers() {
            setLoading(true);
            try {
                const response: UsersResponse = await userService.index(apiParams);
                if (!mounted) return;
                setUsers(response.data.rows);
                setTotal(response.data.meta.total || 0);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        fetchUsers();
        return () => {
            mounted = false;
        };
    }, [apiParams]);

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        setPaginationModel(model);
    };

    const handleSortModelChange = (model: GridSortModel) => {
        setSortModel(model);
        setPaginationModel((p) => ({ ...p, page: 0 }));
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const onSubmit = (values: any) => {
        console.log('Form data:');
        console.log(JSON.stringify(values, null, 2))
    };

    return (
        <div>
            <UsersTable
                users={users}
                total={total}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                sortModel={sortModel}
                onSortModelChange={handleSortModelChange}
                onRowClick={(row) => {
                    console.log('row clicked', row);
                }}
                loading={loading}
                search={search}
                withTrashed={withTrashed}
                onSearchChange={setSearch}
                onWithTrashedChange={setWithTrashed}
                onAdd={() => handleOpenDialog()}
            />

            <FormDialog
                openDialog={openDialog}
                onClose={handleCloseDialog}
                isEdit={false}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default UserPage;
