import { IRoute } from "./routes";
import PaymentTypes from "@/pages/PaymentType/PaymentType/PaymentType";
import CreatePaymentType from "@/pages/PaymentType/CreatePaymentType/CreatePaymentType";
import UpdatePaymentType from "@/pages/PaymentType/UpdatePaymentType/UpdatePaymentType";

export const paymentTypeRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <PaymentTypes />,
  },
  {
    path: "/create",
    element: () => <CreatePaymentType />,
  },
  {
    path: "/update/:id",
    element: () => <UpdatePaymentType />,
  },
];
