import { IRoute } from "./routes";
import Vouchers from "@/pages/Voucher/Vouchers/Vouchers";
import CreateVoucher from "@/pages/Voucher/CreateVoucher/CreateVoucher";
import UpdateVoucher from "@/pages/Voucher/UpdateVoucher/UpdateVoucher";

export const voucherRoutes: IRoute[] = [
  {
    path: "/",
    element: () => <Vouchers />,
  },
  {
    path: "/create",
    element: () => <CreateVoucher />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateVoucher />,
  },
];
