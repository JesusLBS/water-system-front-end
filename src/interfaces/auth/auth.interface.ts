export interface Root {
    ok: boolean
    status: number
    message: string
    data: Data
}

export interface Data {
    token: string
}
