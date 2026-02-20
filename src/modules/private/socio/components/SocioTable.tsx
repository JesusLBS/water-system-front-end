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
  onAdd: () => void;
  // header props
  search: string;
  withTrashed: string;
  onSearchChange: (value: string) => void;
  onWithTrashedChange: (value: string) => void;
  onEditSubmit: (values: any, isEdit: boolean) => void;
  onConfirm: (action: DialogActionKey | null, item: SocioRow) => Promise<void>
}

/**
 * Presentational SocioTable.
 * Columns are declared here. Paging/sorting handled by parent.
 * Header is imported and rendered here; handlers are forwarded from parent.
 */
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
  // header props
  search,
  withTrashed,
  onSearchChange,
  onWithTrashedChange,
  onEditSubmit,
  onConfirm,
}) => {

  const columnsTable = getColumnsTable (onEditSubmit,onConfirm);

  return (
    <div>
      {/* Header component  */}
      <HeaderTable
        search={search}
        withTrashed={withTrashed}
        onSearchChange={onSearchChange}
        onWithTrashedChange={onWithTrashedChange}
        onAdd={onAdd}
        addLabel={"Add Socio"}
      />

      {/* Table component */}
      <ReusableTable<SocioRow>
        rows={socios}
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

export default SocioTable;
