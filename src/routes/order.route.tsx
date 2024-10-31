import Orders from "@/pages/Order/Orders/Orders";
import { IRoute } from "./routes";
import DetailOrder from "@/pages/Order/DetailOrder/DetailOrder";

export const orderRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Orders />,
  },
  {
    path: "/details/:id",
    element: () => <DetailOrder />,
  },
];
