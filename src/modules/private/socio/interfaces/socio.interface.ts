import { ApiResponse } from "../../../../interfaces/shared/api-response.interface";
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

export interface SocioResponseDTO {
  user: {
    uid: string;
    name: string;
    email: string;
    roleId: number;
  };
  profile: {
    lastName: string | null;
    secondLastName: string | null;
    mobile: string | null;
    birthdate: string | null;
    age: number | null;
    totalDependents: number | null;
  };
  address: {
    address: string | null;
    city: string | null;
    country: string | null;
  };
  waterTake: {
    waterTakeId: number;
    waterLineId: number;
    waterLineName: string;
    isSuspended: boolean;
  };
}

export type SociosResponse = IndexResponse<SocioRow>;
export type SocioDetailResponse = ApiResponse<SocioResponseDTO>;