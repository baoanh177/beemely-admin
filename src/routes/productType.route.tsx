import ProductTypes from "@/pages/ProductType/ProductTypes/ProductTypes";
import { IRoute } from "./routes";
import CreateProductType from "@/pages/ProductType/CreateProductType/CreateProductType";
import UpdateProductType from "@/pages/ProductType/UpdateProductType/UpdateProductType";

export const productTypeRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <ProductTypes />,
  },
  {
    path: "/create",
    element: () => <CreateProductType />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateProductType />,
  },
];
