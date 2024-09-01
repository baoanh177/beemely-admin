import { IRoute } from "./routes";
import FlagPages from "@/pages/FlagPage/FlagPages/FlagPages";
import CreateFlagPage from "@/pages/FlagPage/CreateFlagPage/CreateFlagPage";
import UpdateFlagPage from "@/pages/FlagPage/UpdateFlagPage/UpdateFlagPage";

export const flagPageRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <FlagPages />,
  },
  {
    path: "/create",
    element: () => <CreateFlagPage />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateFlagPage />,
  },
];
