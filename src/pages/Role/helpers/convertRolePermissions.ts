import { IRole } from "@/services/store/role/role.model";

export const convertRolePermissions = (role: IRole) => {
  return { ...role, permissions: role.permissions.map((p) => p.id) };
};
