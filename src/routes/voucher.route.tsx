import { IRoute } from "./routes";
import Vouchers from "@/pages/Voucher/Vouchers/Vouchers";
import CreateVoucher from "@/pages/Voucher/CreateVoucher/CreateVoucher";
import UpdateVoucher from "@/pages/Voucher/UpdateVoucher/UpdateVoucher";
import DetailVoucher from "@/pages/Voucher/DetailVoucher/DetailVoucher";

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
    path: "/detail/:id",
    element: () => <DetailVoucher />,
  },
  {
    path: "/update/:id",
    element: () => <UpdateVoucher />,
  },
];
