import { IndexResponse } from "../../../../interfaces/shared/index.interface";
import { UserStatus } from "./actionTypes.config.interface";

export interface UserRow {
  uid: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export type UsersResponse = IndexResponse<UserRow>;
