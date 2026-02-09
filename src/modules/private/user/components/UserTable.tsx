import React from 'react';
import { GridSortModel } from '@mui/x-data-grid';
import { UserRow } from '../interfaces/user.interface';
import ReusableTable from '../../../../shared/components/ReusableTable';
import HeaderTable from '../../../../shared/components/HeaderTable';
import { getColumnsTable } from './ColumnsTable';
import { DialogActionKey } from '../interfaces/actionTypes.config.interface';

interface UsersTableProps {
  users: UserRow[];
  total: number;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
  sortModel: GridSortModel;
  onSortModelChange: (model: GridSortModel) => void;
  onRowClick?: (row: UserRow) => void;
  loading?: boolean;
  onAdd: () => void;
  // header props
  search: string;
  withTrashed: string;
  onSearchChange: (value: string) => void;
  onWithTrashedChange: (value: string) => void;
  onEditSubmit: (values: any, isEdit: boolean) => void;
  onConfirm: (action: DialogActionKey | null, item: UserRow) => Promise<void>
}

/**
 * Presentational UsersTable.
 * Columns are declared here. Paging/sorting handled by parent.
 * Header is imported and rendered here; handlers are forwarded from parent.
 */
const UsersTable: React.FC<UsersTableProps> = ({
  users,
  total,
  paginationModel,
  onPaginationModelChange,
  sortModel,
  onSortModelChange,
  onRowClick,
  loading = false,
  onAdd,
  // header props
  search,
  withTrashed,
  onSearchChange,
  onWithTrashedChange,
  onEditSubmit,
  onConfirm,
}) => {

  const columnsTable = getColumnsTable(onEditSubmit,onConfirm);

  return (
    <div>
      {/* Header component  */}
      <HeaderTable
        search={search}
        withTrashed={withTrashed}
        onSearchChange={onSearchChange}
        onWithTrashedChange={onWithTrashedChange}
        onAdd={onAdd}
        addLabel={"Add User"}
      />

      {/* Table component */}
      <ReusableTable<UserRow>
        rows={users}
        columns={columnsTable}
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
  );
};

export default UsersTable;
