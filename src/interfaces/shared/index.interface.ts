export interface IndexResponse<T> {
    ok: boolean;
    status: number;
    message: string;
    data: {
        rows: T[];
        meta: Meta;
    };
}

export interface Meta {
    total: number;
    active: number;
    inactive: number;
    filtered: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
