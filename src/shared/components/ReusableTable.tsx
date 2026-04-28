import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';

interface ReusableTableProps<T extends { uid: string }> {
  rows: T[];
  columns: GridColDef[];
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  sortModel: GridSortModel;
  onSortModelChange: (model: GridSortModel) => void;
  checkboxSelection?: boolean;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  pageSizeOptions?: number[];
}

/**
 * Reusable DataGrid wrapper configured for server-side pagination & sorting.
 */
function ReusableTable<T extends { uid: string }>({
  rows,
  columns,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  sortModel,
  onSortModelChange,
  checkboxSelection = true,
  onRowClick,
  loading = false,
  pageSizeOptions = [5, 10, 25, 50],
}: ReusableTableProps<T>) {
  return (
    <div style={{ height: 640, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.uid ?? row.id ?? Math.random()}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={pageSizeOptions}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        checkboxSelection={checkboxSelection}
        disableColumnFilter={false}
        disableColumnMenu={false}
        onRowClick={(params: GridRowParams<T>) => onRowClick?.(params.row)}
        loading={loading}
      />
    </div>
  );
}

export default ReusableTable;
