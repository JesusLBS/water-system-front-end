import { Box, Button, Stack, Typography } from "@mui/material";
import { DependentRow } from "../interfaces/dependent.interface";
import DependentCard from "./DependentCard";

interface Props {
    dependents: DependentRow[];
    onSelect: (item: DependentRow) => void;
    onCreate: () => void;
}

const DependentList: React.FC<Props> = ({ dependents, onSelect, onCreate }) => {
    return (
        <Box>

            <Button
                variant="contained"
                fullWidth
                sx={{ mb: 2 }}
                onClick={onCreate}
            >
                Nuevo Dependiente
            </Button>

            <Box
                sx={{
                    maxHeight: 520,
                    overflowY: "auto",
                    pr: 1,
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "background.paper"
                }}
            >
                {dependents.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        No hay dependientes registrados
                    </Typography>
                ) : (
                    <Stack spacing={2}>
                        {dependents.map((item) => (
                            <DependentCard
                                key={item.id}
                                item={item}
                                onClick={() => onSelect(item)}
                            />
                        ))}
                    </Stack>
                )}
            </Box>

        </Box>
    );
};

export default DependentList;