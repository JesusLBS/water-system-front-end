export interface ApiResponse<T = any> {
    ok: boolean;
    status: number;
    message: string;
    data: T;
}
