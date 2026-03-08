import { Card, CardContent, Typography } from "@mui/material";
import { DependentRow } from "../interfaces/dependent.interface";

interface Props {
    item: DependentRow;
    onClick: () => void;
}

const DependentCard: React.FC<Props> = ({ item, onClick }) => {
    return (
        <Card
            onClick={onClick}
            sx={(theme) => ({
                cursor: "pointer",
                border: `1px solid ${theme.palette.divider}`,
                transition: "all 0.2s ease",
                "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    transform: "translateY(-1px)",
                }
            })}
        >
            <CardContent>
                <Typography fontWeight={600}>
                    {item.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Estado: {item.status}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DependentCard;