import { Data, HeadCell } from "../interfaces/Data";

export const rows: Data[] = [
    {
        uid: "9pfiwn",
        fullName: "Jose Perez Martinez",
        email: "user_9pfiwn@example.com",
        totalDependents: 0,
        createdAt: "24/08/2024 06:55:30 P.M.",
        updatedAt: "24/08/2024 06:55:30 P.M.",
        deletedAt: null,
        actions: null
    },
    {
        uid: "m0ngtr",
        fullName: "Ana Gonzalez Johnson",
        email: "user_m0ngtr@example.com",
        totalDependents: 7,
        createdAt: "27/08/2024 06:50:56 P.M.",
        updatedAt: "05/09/2024 06:45:17 P.M.",
        deletedAt: null,
        actions: null
    }
];

export const headCells: readonly HeadCell[] = [
    {
        id: 'uid',
        numeric: false,
        disablePadding: true,
        label: 'Uid',
    },
    {
        id: 'fullName',
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
        id: 'totalDependents',
        numeric: true,
        disablePadding: false,
        label: 'Dependientes',
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
