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
  userData: {
    uid: string;
    name: string;
    email: string;
  };
  profileData: {
    lastName: string;
    secondLastName: string;
    mobile: string;
    birthdate: string;
    age: number;
    totalDependents: number;
  };
  addressData: {
    address: string;
    city: string;
    country: string;
  };
}

export type SociosResponse = IndexResponse<SocioRow>;
export type SocioDetailResponse = ApiResponse<SocioResponseDTO>;