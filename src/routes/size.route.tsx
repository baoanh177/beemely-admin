import { IRoute } from "./routes";
import CreateSize from "@/pages/Size/CreateSize/CreateSize";
import Sizes from "@/pages/Size/Sizes/Sizes";
import UpdateSize from "@/pages/Size/UpdateSize.tsx/UpdateSize";

export const sizeRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Sizes />,
  },
  {
    path: "/create",
    element: () => <CreateSize />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateSize />,
  },
];
