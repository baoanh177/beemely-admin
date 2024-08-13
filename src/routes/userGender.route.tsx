import CreateUserGender from "@/pages/UserGender/CreateUserGender/CreateUserGender";
import UpdateUserGender from "@/pages/UserGender/UpdateUserGender/UpdateUserGender";
import UserGenders from "@/pages/UserGender/UserGenders/UserGenders";
import { IRoute } from "./routes";

export const userGenderRouter: IRoute[] = [
  {
    path: "/",
    element: () => <UserGenders />,
  },
  {
    path: "/create",
    element: () => <CreateUserGender />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateUserGender />,
  },
];
