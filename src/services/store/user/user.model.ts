import { IRole } from "../role/role.model";

export interface IUser {
  id: string;
  addressList: unknown[];
  avatarUrl: string;
  birthDay: string;
  email: string;
  phone: string;
  roles: IRole[];
  sex: string;
  status: string;
  tagList: unknown[];
  userName: string;
  vouchers: unknown[];
}
