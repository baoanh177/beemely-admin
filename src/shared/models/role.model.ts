import { IPermission } from "./permissions.model";

export interface IRole {
  id: string;
  name: string;
  permissions: IPermission[];
}
