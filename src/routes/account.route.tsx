import Accounts from "@/pages/Account/Accounts/Accounts";
import CreateAccount from "@/pages/Account/CreateAccount/CreateAccount";

export const accountRoutes = [
  {
    path: "/",
    element: () => <Accounts />,
  },
  {
    path: "/create",
    element: () => <CreateAccount />,
  },
];
