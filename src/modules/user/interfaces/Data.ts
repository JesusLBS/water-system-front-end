export interface Data {
    id: number;
    uid: string
    name: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    actions: any
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}