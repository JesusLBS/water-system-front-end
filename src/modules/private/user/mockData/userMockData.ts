import { Data, HeadCell } from "../interfaces/Data";

export const rows: Data[] = [
    {
        id: 1,
        uid: "Alop2OSLPPWeXWd1EYHNydkEg492",
        name: 'Jesus',
        email: 'chichohdzjesus@gmail.com',
        role: "Root User",
        createdAt: "24/08/2024 05:29:57 P.M.",
        updatedAt: "24/08/2024 05:29:57 P.M.",
        deletedAt: null,
        actions: null,
    },
    {
        id: 2,
        uid: "asdsadadasdada",
        name: 'Any',
        email: 'any@gmail.com',
        role: "Root User",
        createdAt: "24/08/2024 05:29:57 P.M.",
        updatedAt: "24/08/2024 05:29:57 P.M.",
        deletedAt: "24/08/2024 05:29:57 P.M.",
        actions: null
    }
];

export const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'role',
        numeric: true,
        disablePadding: false,
        label: 'Rol',
    },
    {
        id: 'createdAt',
        numeric: true,
        disablePadding: false,
        label: 'Creado',
    },
    {
        id: 'updatedAt',
        numeric: true,
        disablePadding: false,
        label: 'Actualizado',
    },
    {
        id: 'deletedAt',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Acciones',
    },
];
