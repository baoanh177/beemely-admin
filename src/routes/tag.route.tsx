import Tags from "@/pages/Tag/Tags/Tags";
import { IRoute } from "./routes";
import CreateTag from "@/pages/Tag/CreateTag/CreateTag";
import UpdateTag from "@/pages/Tag/UpdateTag/UpdateTag";

export const tagRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Tags />,
  },
  {
    path: "/create",
    element: () => <CreateTag />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateTag />,
  },
];
