import Colors from "@/pages/Color/Colors/Colors";
import { IRoute } from "./routes";
import CreateColor from "@/pages/Color/CreateColor/CreateColor";
import UpdateColor from "@/pages/Color/UpdateColor/UpdateColor";

export const colorRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Colors />,
  },
  {
    path: "/create",
    element: () => <CreateColor />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateColor />,
  },
];
