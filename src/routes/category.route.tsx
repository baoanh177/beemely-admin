import { IRoute } from "./routes";
import UpdateCategory from "@/pages/Category/UpdateCategory/UpdateCategory";
import CreateCategory from "@/pages/Category/CreateCategory/CreateCategory";
import Categories from "@/pages/Category/Categories/Categories";

export const categoryRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Categories />,
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
