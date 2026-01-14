export interface Root {
    ok: boolean
    status: number
    message: string
    data: Data
}

export interface Data {
    countAll: number
    count: number
    rows: Row[]
    headers: Header[]
    page: number
    lastPage: number
    hasMore: boolean
}

export interface Row {
    uid: string
    name: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface Header {
    header: string
    key: string
}
