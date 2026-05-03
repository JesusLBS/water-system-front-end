import { IndexResponse } from "../../../../interfaces/shared/index.interface";
import { WaterLineStatus } from "./actionTypes.config.interface";

export interface WaterLineRow {
    id: number
    name: string
    status: WaterLineStatus
    createdAt: string
    updatedAt: string
}

export interface WaterTakeRow {
  id: number
  uid: string
  socioName: string
  dependentsCount: number
  status: string
  createdAt: string
  updatedAt: string
}

export type WaterLineResponse = IndexResponse<WaterLineRow>;
export type WaterTakeByLineResponse = IndexResponse<WaterTakeRow>;
