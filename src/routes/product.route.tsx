import Products from "@/pages/Product/Products/Products";
import { IRoute } from "./routes";
import CreateProduct from "@/pages/Product/CreateProduct/CreateProduct";
import UpdateProduct from "@/pages/Product/UpdateProduct/UpdateProduct";

export const productRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Products />,
  },
  {
    path: "/create",
    element: () => <CreateProduct />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateProduct />,
  },
];
