export interface Root {
    ok: boolean
    status: number
    message: string
    data: Data
}

export interface Data {
    token: string
}

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    userId: string | null;
}