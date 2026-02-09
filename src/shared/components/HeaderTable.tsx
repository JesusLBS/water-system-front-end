import React from 'react';
import {
    TextField,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface HeaderTableProps {
    search: string;
    withTrashed: string;
    onSearchChange: (value: string) => void;
    onWithTrashedChange: (value: string) => void;
    onAdd?: () => void; // optional
    addLabel?: string;
}

const HeaderTable: React.FC<HeaderTableProps> = ({
    search,
    withTrashed,
    onSearchChange,
    onWithTrashedChange,
    onAdd,
    addLabel = 'Add',
}) => {
    return (
        <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            mb={2}
            alignItems="center"
        >
            {/* Search */}
            <TextField
                label="Search"
                size="small"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                sx={{
                    width: { xs: '100%', md: 280 },
                }}
            />

            {/* Status */}
            <FormControl
                size="small"
                sx={{
                    width: { xs: '100%', md: 180 },
                }}
            >
                <InputLabel id="with-trashed-label">Status</InputLabel>
                <Select
                    labelId="with-trashed-label"
                    value={withTrashed}
                    label="Status"
                    onChange={(e) => onWithTrashedChange(String(e.target.value))}
                >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
            </FormControl>

            {/* Add button */}
            {onAdd && (
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAdd}
                    sx={{
                        width: { xs: '100%', md: 'auto' },
                        ml: { md: 'auto' },
                    }}
                >
                    {addLabel}
                </Button>
            )}
        </Box>
    );

};

export default HeaderTable;
