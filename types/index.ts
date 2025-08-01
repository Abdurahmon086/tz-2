import { IUser } from "./user";

export interface UserListResponse {
  elements: number;
  list: IUser[];
}
