import { IndexResponse } from "../../../../interfaces/shared/index.interface";
import { SocioStatus } from "./actionTypes.config.interface";

export interface SocioRow {
  uid: string
  fullName: string
  email: string
  totalDependents: number
  status: SocioStatus
  createdAt: string
  updatedAt: string
}

export type SociosResponse = IndexResponse<SocioRow>;
