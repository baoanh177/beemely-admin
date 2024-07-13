import { Permissions } from "@/shared/enums/permissions";

export interface IPermission {
  id: string;
  name: Permissions;
  module: string;
  label: string;
}

export interface IPermissionResponseData {}
