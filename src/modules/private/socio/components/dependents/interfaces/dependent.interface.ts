import { ApiResponse } from "../../../../../../interfaces/shared/api-response.interface"
import { IndexResponse } from "../../../../../../interfaces/shared/index.interface"

export interface DependentRow {
    id: number
    name: string
    status: string
    createdAt: string
    updatedAt: string
}

export interface DataDTO {
  id: number
  name: string
  lastName: string
  secondLastName: string
  mobile: string
  birthdate: string
  age: number
  relationshipId: number
  isFamilyHead: boolean
}

export type DependentsResponse = IndexResponse<DependentRow>;
export type DependentDetailResponse = ApiResponse<DataDTO>;