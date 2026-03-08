import { useState } from "react";
import { DependentRow } from "../interfaces/dependent.interface";

export const useDependents = () => {
    const [dependents, setDependents] = useState<DependentRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<DependentRow | null>(null);
    const [openForm, setOpenForm] = useState(false);

    return {
        dependents,
        setDependents,
        loading,
        setLoading,
        selected,
        setSelected,
        openForm,
        setOpenForm
    };
};