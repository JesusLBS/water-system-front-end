import React, { useEffect, useMemo, useState } from 'react';
import { UserRow, UsersResponse } from '../interfaces/user.interface';
import UserService from '../services/userService';
import { GridSortModel, GridPaginationModel } from '@mui/x-data-grid';
import { IndexQueryParams } from '../../../../interfaces/shared/index-params.interface';
import UsersTable from '../components/UserTable';
import FormDialog from '../components/FomDialog';
import { ReusableStatsCards } from '../../../../shared/components/ReusableStatsCards';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastNotifications';
import { DialogActionKey } from '../interfaces/actionTypes.config.interface';

/**
 * UserPage (container) - controls pagination, sorting, search and calls API.
 */
const userService = new UserService();

const UserPage: React.FC = () => {
    const [users, setUsers] = useState<UserRow[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [meta, setMeta] = useState<UsersResponse['data']['meta'] | null>(null);

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
                setMeta(response.data.meta);

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

    const generateUid = (length = 16) =>
        Math.random().toString(36).substring(2, 2 + length);

    const handleFormSubmit = async (values: any, isEdit: boolean) => {
        try {
            const response = isEdit
                ? await userService.update(values)
                : await userService.store({ ...values, uid: generateUid() });

            if (!response.ok) {
                showErrorToast(
                    isEdit
                        ? 'No se pudo actualizar el usuario'
                        : 'No se pudo crear el usuario'
                );
                return;
            }

            showSuccessToast(
                isEdit
                    ? 'Usuario actualizado correctamente'
                    : 'Usuario creado correctamente'
            );

            setOpenDialog(false);
            setPaginationModel((p) => ({ ...p }));
        } catch (error) {
            console.error(error);
            showErrorToast('Error inesperado al guardar el usuario');
        }
    };

    const actionHandlers: Record<
        DialogActionKey,
        (uid: string) => Promise<boolean>
    > = {
        Deactivate: async (uid) => {
            return await userService.deactivate({ dataId: uid });
        },
        Activate: async (uid) => {
            return await userService.activate({ dataId: uid });
        },
        Delete: async (uid) => {
            return await userService.delete({ dataId: uid });
        },
    };

    const successMessages: Record<DialogActionKey, string> = {
        Deactivate: 'User deactivated successfully',
        Activate: 'User activated successfully',
        Delete: 'User deleted successfully',
    };

    const handleOnConfirm = async (
        action: DialogActionKey | null,
        item: UserRow
    ): Promise<void> => {
        if (!action) return;

        try {
            const success = await actionHandlers[action](item.uid);

            if (!success) {
                showErrorToast('Operation failed');
                return;
            }

            showSuccessToast(successMessages[action]);
            setPaginationModel((p) => ({ ...p }));
        } catch (error) {
            console.error(error);
            showErrorToast('Unexpected error');
        }
    };

    return (
        <div>
            <ReusableStatsCards meta={meta} />
            <UsersTable
                users={users}
                total={meta?.filtered || 0}
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

export default UserPage;
