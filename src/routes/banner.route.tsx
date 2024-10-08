import Banners from "@/pages/Banner/Banners/Banners";
import CreateBanner from "@/pages/Banner/CreateBanner/CreateBanner";
import UpdateBanner from "@/pages/Banner/UpdateBanner/UpdateBanner";
import { IRoute } from "./routes";

export const bannerRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Banners />,
  },
  {
    path: "/create",
    element: () => <CreateBanner />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateBanner />,
  },
];
