import { IRoute } from "./routes";
import CreateRender from "@/pages/Gender/CreateGender.tsx/CreateGender";
import Genders from "@/pages/Gender/Genders/Genders";
import UpdateRender from "@/pages/Gender/UpdateGender/UpdateGender";

export const genderRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Genders />,
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
