import { Permissions } from "@/shared/enums/permissions";
import { IRole } from "../role/role.model";

export interface IUserData {
  id: string;
  userName: string;
  email: string;
  roles: string[];
  permissions: Permissions[];
  addressList: string[];
}

export interface IUserProfile {
  id: string;
  userName: string;
  email: string;
  listNamePermission: Permissions[];
  listNameRole: string[];
  roles: IRole[];
}

export interface ILoginResponseData {
  userData: IUserData;
  accessToken: string;
  refreshToken: string;
}
