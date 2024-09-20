import React from 'react';
import {
    alpha,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    IconButton,
    Tooltip,
    FormControlLabel,
    Switch,
    Autocomplete,
    TextField,
    Button,
    Chip,
    Divider,
    SvgIcon,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    FilterList as FilterListIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import { headCells, rows } from '../mockData/userMockData';
import { Data } from '../interfaces/Data';
import FormDialog from './FomDialog';
import MenuListButton from './MenuListButton';


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead
            sx={{
                fontWeight: 'bold',
            }}>
            <TableRow sx={{}}>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Users
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

const UsersTable: React.FC = () => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filterValue, setFilterValue] = React.useState<string | null>(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n: any) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];
        const target = event.target as HTMLElement;
        if (target.closest('.menu-list-button') || target.closest('button')) {
            // Si el clic fue en un botón de acción, no cambiar la selección
            return;
        }
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    // Search filter for all relevant columns
    const filteredRows = filterValue
        ? rows
            .filter((row) =>
                `${row.name} ${row.email} ${row.role}`
                    .toLowerCase()
                    .includes(filterValue.toLowerCase())
            )
        : rows;

    const handleFilterChange = (event: any, value: string | null) => {
        setFilterValue(value);
    };

    const visibleRows = React.useMemo(
        () =>
            [...filteredRows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, filteredRows],
    );
    const totalColumns = headCells.length + 1;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 2,
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        gap: 2,
                    }}
                >
                    <Autocomplete
                        disablePortal
                        options={rows.map((row) => `${row.name}`)}
                        value={filterValue || ''}
                        onInputChange={handleFilterChange}
                        onBlur={() => { }}
                        sx={{ width: { xs: '100%', sm: 300 } }}
                        renderInput={(params) => <TextField {...params} label="Users" />}
                    />
                    <div>
                        <Button variant="outlined" onClick={handleOpenDialog} sx={{ width: { xs: '100%', sm: 150 } }}>
                            <AddIcon />
                            Open Dialog
                        </Button>
                        <FormDialog
                            openDialog={openDialog}
                            onClose={handleCloseDialog}
                            isEdit={false}
                        />
                    </div>
                </Box>

                <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 650, width: '100%' }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={totalColumns} align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: 'gray',
                                                padding: 2,
                                                height: {
                                                    xs: '200px',
                                                    sm: '300px',
                                                    md: '400px'
                                                },
                                                overflow: 'hidden',
                                                width: '100%'
                                            }}
                                        >
                                            <SvgIcon
                                                sx={{
                                                    marginBottom: 1,
                                                    fontSize: {
                                                        xs: 40,
                                                        sm: 45,
                                                        md: 50
                                                    }
                                                }}
                                            >
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2V11h2v5.5zm0-7h-2V7h2v2.5z" />
                                            </SvgIcon>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontSize: {
                                                        xs: '14px',
                                                        sm: '16px',
                                                        md: '18px'
                                                    }
                                                }}
                                            >
                                                No data
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>


                            ) : (
                                visibleRows.map((row, index) => {
                                    const isItemSelected = selected.includes(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>

                                            {headCells.map((header) => {
                                                if (header.id !== 'actions') {
                                                    return (
                                                        <TableCell align="right" key={header.id}>
                                                            {header.id === 'deletedAt'
                                                                ? row[header.id] ?
                                                                    <Chip label="Inactive" color="default" variant="outlined" /> : <Chip label="Active" color="success" />
                                                                : row[header.id]}
                                                        </TableCell>
                                                    );
                                                }
                                                return null;
                                            })}
                                            <TableCell align="center">
                                                <MenuListButton item={row} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })

                            )}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={totalColumns} />
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            flexDirection: {
                                xs: 'column',
                                sm: 'row',
                            },
                        }}
                    />
                </TableContainer>
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );


}

export default UsersTable;
