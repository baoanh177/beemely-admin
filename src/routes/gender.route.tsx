import Gender from "@/pages/Gender/Gender.tsx/Gender";
import { IRoute } from "./routes";
import CreateRender from "@/pages/Gender/CreateRender.tsx/CreateRender";
import UpdateRender from "@/pages/Gender/UpdateRender/UpdateRender";

export const genderRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Gender />,
  },
  {
    path: "/create",
    element: () => <CreateRender />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateRender />,
  },
];
