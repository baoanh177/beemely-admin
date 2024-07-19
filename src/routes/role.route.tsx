import Roles from "@/pages/Role/Roles/Roles";
import { IRoute } from "./routes";
import CreateRole from "@/pages/Role/CreateRole/CreateRole";
import UpdateRole from "@/pages/Role/UpdateRole/UpdateRole";
import DetailRole from "@/pages/Role/DetailRole/DetailRole";
import PermissionMiddleware from "@/middlewares/PermissionMiddleware";
import { EPermissions } from "@/shared/enums/permissions";

export const roleRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Roles />,
  },
  {
    path: "/create",
    element: () => <CreateRole />,
    middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.CREATE_ROLE]} />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateRole />,
    middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.UPDATE_ROLE]} />,
  },
  {
    path: "/detail/:id",
    element: () => <DetailRole />,
    middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_ROLE]} />,
  },
];
