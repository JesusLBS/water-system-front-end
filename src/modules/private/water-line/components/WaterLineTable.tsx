import React from 'react';
import { GridSortModel } from '@mui/x-data-grid';
import ReusableTable from '../../../../shared/components/ReusableTable';
import HeaderTable from '../../../../shared/components/HeaderTable';
import { DialogActionKey } from '../interfaces/actionTypes.config.interface';
import { WaterLineRow } from '../interfaces/water-line';
import { getColumnsTable } from './ColumnsTable';

interface WaterLineTableProps {
  waterLines: WaterLineRow[];
  total: number;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
  sortModel: GridSortModel;
  onSortModelChange: (model: GridSortModel) => void;
  onRowClick?: (row: WaterLineRow) => void;
  loading?: boolean;

  // header
  onAdd: () => void;
  search: string;
  withTrashed: string;
  onSearchChange: (value: string) => void;
  onWithTrashedChange: (value: string) => void;

  // acciones
  onEdit: (item: WaterLineRow) => void;
  onConfirm: (action: DialogActionKey, item: WaterLineRow) => Promise<void>;
  onDetail: (item: WaterLineRow) => void;
}

const WaterLineTable: React.FC<WaterLineTableProps> = ({
  waterLines,
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
        addLabel="Add Water Line"
      />

      <ReusableTable<any>
        rows={waterLines}
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

export default WaterLineTable;