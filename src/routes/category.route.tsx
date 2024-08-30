import { IRoute } from "./routes";
import Categorys from "@/pages/Category/Categorys/Categorys";
import CreateCategory from "@/pages/Category/CreateCategory.tsx/CreateCategory";
import UpdateCategory from "@/pages/Category/UpdateCategory/UpdateCategory";

export const categoryRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Categorys />,
  },
  {
    path: "/create",
    element: () => <CreateCategory />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateCategory />,
  },
];
