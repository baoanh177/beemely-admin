import { EPermissions } from "@/shared/enums/permissions";

export const checkPermission = (userPermissions?: EPermissions[], requiredPermissions?: EPermissions[] | EPermissions) => {
  if (!requiredPermissions) return true;
  if (!userPermissions) return false;
  if (Array.isArray(requiredPermissions)) {
    return requiredPermissions.some((permission) => userPermissions.includes(permission));
  }
  return userPermissions.includes(requiredPermissions);
};
