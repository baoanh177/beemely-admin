import PermissionMiddleware from "@/middlewares/PermissionMiddleware";
import { IRoute } from "./routes";
import { EPermissions } from "@/shared/enums/permissions";
import Users from "@/pages/User/Users/Users";
import CustomerDetail from "@/pages/User/CustomerDetail/CustomerDetail";

export const userRoutes: IRoute[] = [
  {
    path: "/",
    middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_USER]} />,
    element: () => <Users />
  },
  {
    path: "/create",
    middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.CREATE_USER]} />,
    element: () => <Users />
  },
  {
    path: "/update/:id",
    middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.UPDATE_USER]} />,
    element: () => <Users />
  },
  {
    path: "/detail/:id",
    middleware: () => <PermissionMiddleware requiredPermissions={[EPermissions.READ_USER]} />,
    element: () => <CustomerDetail />
  }
]