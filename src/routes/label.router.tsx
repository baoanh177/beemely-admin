import Labels from "@/pages/Label/Labels/Labels";
import { IRoute } from "./routes";
import CreateLabel from "@/pages/Label/CreateLabel/CreateLabel";
import UpdateLabel from "@/pages/Label/UpdateLabel/UpdateLabel";

export const labelRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Labels />,
  },
  {
    path: "/create",
    element: () => <CreateLabel />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateLabel />,
  },
];
