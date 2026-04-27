import { IndexResponse } from "../../../../interfaces/shared/index.interface";

export interface WaterLineRow {
    id: number
    name: string
    status: string
    createdAt: string
    updatedAt: string
}

export type WaterLineResponse = IndexResponse<WaterLineRow>;
