import { IRoute } from "./routes";
import ShippingMethod from "@/pages/ShippingMethod/ShippingMethod/ShippingMethod";
import CreateShippingMethod from "@/pages/ShippingMethod/CreateShippingMethod/CreateShippingMethod";
import UpdateShippingMethod from "@/pages/ShippingMethod/UpdateShippingMethod/UpdateShippingMethod";

export const shippingMethodRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <ShippingMethod />,
  },
  {
    path: "/create",
    element: () => <CreateShippingMethod />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateShippingMethod />,
  },
];
