import Brands from "@/pages/Brand/Brands/Brands";
import { IRoute } from "./routes";
import CreateBrand from "@/pages/Brand/CreateBrand/CreateBrand";
import UpdateBrand from "@/pages/Brand/UpdateBrand/UpdateBrand";

export const brandRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Brands />,
  },
  {
    path: "/create",
    element: () => <CreateBrand />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateBrand />,
  },
];
