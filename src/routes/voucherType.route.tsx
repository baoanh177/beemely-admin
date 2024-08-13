import VoucherTypes from "@/pages/VoucherType/VoucherTypes/VoucherTypes";
import { IRoute } from "./routes";
import CreateVoucherType from "@/pages/VoucherType/CreateVoucherType/CreateVoucherType";
import UpdateVoucherType from "@/pages/VoucherType/UpdateVoucherType/UpdateVoucherType";

export const voucherTypeRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <VoucherTypes />,
  },
  {
    path: "/create",
    element: () => <CreateVoucherType />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateVoucherType />,
  },
];
