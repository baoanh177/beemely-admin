import { checkPermission } from "@/helpers/checkPermission";
import { useArchive } from "@/hooks/useArchive";
import AccessDenied from "@/pages/Errors/AccessDenied";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { EPermissions } from "@/shared/enums/permissions";
import { Outlet } from "react-router-dom";

const PermissionMiddleware = ({ requiredPermissions }: { requiredPermissions: EPermissions[] }) => {
  const { state } = useArchive<IAuthInitialState>("auth");

  const canAccess = checkPermission(state.profile?.listNamePermission, requiredPermissions);
  return canAccess ? <Outlet /> : <AccessDenied />;
};

export default PermissionMiddleware;
