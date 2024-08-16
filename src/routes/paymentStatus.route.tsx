import { IRoute } from "./routes";
import PaymentStatus from "@/pages/PaymentStatus/PaymentStatus/PaymentStatus";
import CreatePaymentStatus from "@/pages/PaymentStatus/CreatePaymentStatus/CreatePaymentStatus";
import UpdatePaymentStatus from "@/pages/PaymentStatus/UpdatePaymentStatus/UpdatePaymentStatus";

export const paymentStatusRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <PaymentStatus />,
  },
  {
    path: "/create",
    element: () => <CreatePaymentStatus />,
  },
  {
    path: "/update/:id",
    element: () => <UpdatePaymentStatus />,
  },
];
