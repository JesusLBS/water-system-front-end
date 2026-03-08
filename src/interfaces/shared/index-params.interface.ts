export interface IndexQueryParams {
    limit?: number;
    page?: number;
    sort?: string;
    direction?: 'asc' | 'desc';
    withTrashed?: string;
    search?: string | null;
}