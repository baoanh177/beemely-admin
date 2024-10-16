import Genders from "@/pages/Gender/Genders/Genders";
import { IRoute } from "./routes";
import CreateGender from "@/pages/Gender/CreateGender/CreateGender";
import UpdateGender from "@/pages/Gender/UpdateGender/UpdateGender";

export const genderRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Genders />,
  },
  {
    path: "/create",
    element: () => <CreateGender />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateGender />,
  },
];
