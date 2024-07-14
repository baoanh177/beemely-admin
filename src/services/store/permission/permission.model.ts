import { EPermissions } from "@/shared/enums/permissions";

export interface IPermission {
  id: string;
  name: EPermissions;
  module: string;
  label: string;
}

export interface IPermissionResponseData {}
