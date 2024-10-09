import Accounts from "@/pages/Account/Accounts/Accounts";
import CreateAccount from "@/pages/Account/CreateAccount/CreateAccount";
import DetailAccount from "@/pages/Account/DatailAccount/DetailAccount";
import UpdateAccount from "@/pages/Account/UpdateAccount/UpdateAccount";

export const accountRoutes = [
  {
    path: "/",
    element: () => <Accounts />,
  },
  {
    path: "/create",
    element: () => <CreateAccount />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateAccount />,
  },
  {
    path: "/detail/:id",
    element: () => <DetailAccount />,
  },
];
