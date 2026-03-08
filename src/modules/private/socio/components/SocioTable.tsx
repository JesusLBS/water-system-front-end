import React from 'react';
import { GridSortModel } from '@mui/x-data-grid';
import ReusableTable from '../../../../shared/components/ReusableTable';
import HeaderTable from '../../../../shared/components/HeaderTable';
import { DialogActionKey } from '../interfaces/actionTypes.config.interface';
import { SocioRow } from '../interfaces/socio.interface';
import { getColumnsTable } from './ColumnsTable';

interface UsersTableProps {
  socios: SocioRow[];
  total: number;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
  sortModel: GridSortModel;
  onSortModelChange: (model: GridSortModel) => void;
  onRowClick?: (row: SocioRow) => void;
  loading?: boolean;

  // header
  onAdd: () => void;
  search: string;
  withTrashed: string;
  onSearchChange: (value: string) => void;
  onWithTrashedChange: (value: string) => void;

  // acciones
  onEdit: (item: SocioRow) => void;
  onConfirm: (action: DialogActionKey, item: SocioRow) => Promise<void>;
  onDetail: (item: SocioRow) => void;
}

const SocioTable: React.FC<UsersTableProps> = ({
  socios,
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
  onConfirm,
  onDetail
}) => {

  const columns = React.useMemo(
    () => getColumnsTable(onEdit, onConfirm, onDetail),
    [onEdit, onConfirm, onDetail]
  );

  return (
    <div>
      <HeaderTable
        search={search}
        withTrashed={withTrashed}
        onSearchChange={onSearchChange}
        onWithTrashedChange={onWithTrashedChange}
        onAdd={onAdd}
        addLabel="Add Socio"
      />

      <ReusableTable<SocioRow>
        rows={socios}
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
  );
};

export default SocioTable;