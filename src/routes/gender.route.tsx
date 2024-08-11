import Gender from "@/pages/Gender/Gender/Gender";
import { IRoute } from "./routes";
import CreateGender from "@/pages/Gender/CreateGender.tsx/CreateGender";
import UpdateGender from "@/pages/Gender/UpdateGender/UpdateGender";

export const genderRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Gender />,
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
