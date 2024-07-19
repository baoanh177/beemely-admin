import Permissions from "@/pages/Permission/Permissions/Permissions";
import { IRoute } from "./routes";
import PermissionMiddleware from "@/middlewares/PermissionMiddleware";
import CreatePermission from "@/pages/Permission/CreatePermission/CreatePermission";
import UpdatePermission from "@/pages/Permission/UpdatePermission/UpdatePermission";
import { EPermissions } from "@/shared/enums/permissions";

export const permissionRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Permissions />,
    middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_PERMISSION]} />,
  },
  {
    path: "/create",
    element: () => <CreatePermission />,
    middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.CREATE_PERMISSION]} />,
  },
  {
    path: "/update/:id",
    element: () => <UpdatePermission />,
    middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.UPDATE_PERMISSION]} />,
  },
];
