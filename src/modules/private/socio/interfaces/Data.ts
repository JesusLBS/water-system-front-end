export interface Data {
    uid: string
    fullName: string
    email: string
    totalDependents: number
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