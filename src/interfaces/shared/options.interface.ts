import { ApiResponse } from "./api-response.interface"

export interface OptionsDto {
    rows: Row[]
}

export interface Row {
    id: number
    name: string
}

export type OptionsResponse = ApiResponse<OptionsDto>;