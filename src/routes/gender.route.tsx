import Gender from "@/pages/Gender/Gender.tsx/Gender";
import { IRoute } from "./routes";
import CreateRender from "@/pages/Gender/CreateGender.tsx/CreateGender";
import UpdateRender from "@/pages/Gender/UpdateGender/UpdateGender";

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
