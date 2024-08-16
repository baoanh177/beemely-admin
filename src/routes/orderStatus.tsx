import CreateOrderStatus from "@/pages/OrderStatus/CreateOrderStatus/CreateOrderStatus";
import UpdateOrderStatus from "@/pages/OrderStatus/UpdateOrderStatus/UpdateOrderStatus";
import { IRoute } from "./routes";
import OrderStatuses from "@/pages/OrderStatus/OrderStatuses/OrderStatuses";

export const orderStatusRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <OrderStatuses />,
  },
  {
    path: "/create",
    element: () => <CreateOrderStatus />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateOrderStatus />,
  },
];
