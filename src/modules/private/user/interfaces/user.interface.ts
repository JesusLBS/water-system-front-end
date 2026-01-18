import { IndexResponse } from "../../../../interfaces/shared/index.interface";

export interface UserRow {
  uid: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type UsersResponse = IndexResponse<UserRow>;
