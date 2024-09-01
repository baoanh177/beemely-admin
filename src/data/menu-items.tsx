import { EPermissions } from "@/shared/enums/permissions";
import { IconType } from "react-icons";
import { IoCartOutline, IoPieChartOutline, IoSettingsOutline, IoPeople, IoBagCheckOutline } from "react-icons/io5";
import { RxComponent1 } from "react-icons/rx";

export interface IMenuItem {
  id: string;
  label: string;
  path?: string;
  icon?: {
    component: IconType;
    className?: string;
  };
  items?: (Pick<IMenuItem, Exclude<keyof IMenuItem, "items" | "icon">> & { icon?: { component: IconType; className?: string } })[];
  onClick?: () => void;
  permissions?: EPermissions[] | EPermissions;
}

export const menuItems: IMenuItem[] = [
  {
    id: "1",
    label: "Bảng điều khiển",
    path: "dashboard",
    icon: { component: IoPieChartOutline },
  },
  {
    id: "2",
    label: "Thành viên",
    icon: { component: IoPeople },
    items: [
      {
        id: "2.1",
        label: "Danh sách",
        path: "accounts",
        permissions: EPermissions.READ_ACCOUNT,
      },
      {
        id: "2.2",
        label: "Chức vụ",
        path: "roles",
        permissions: EPermissions.READ_ROLE,
      },
      {
        id: "2.3",
        label: "Quyền",
        path: "permissions",
        permissions: EPermissions.READ_PERMISSION,
      },
      {
        id: "2.4",
        label: "Giới tính người dùng",
        path: "user-genders",
        permissions: EPermissions.READ_USER_GENDER,
      },
    ],
  },
  {
    id: "3",
    label: "Sản phẩm",
    icon: { component: IoCartOutline },
    items: [
      {
        id: "3.1",
        label: "Danh sách",
        path: "products",
        permissions: EPermissions.READ_PRODUCT,
      },
      {
        id: "3.2",
        label: "Thương hiệu",
        path: "brands",
        permissions: EPermissions.READ_BRAND,
      },
      {
        id: "3.3",
        label: "Thẻ",
        path: "tags",
        permissions: EPermissions.READ_TAG,
      },
      {
        id: "3.4",
        label: "Nhãn",
        path: "labels",
        permissions: EPermissions.READ_LABEL,
      },
      {
        id: "3.5",
        label: "Danh mục",
        path: "categories",
        permissions: EPermissions.READ_CATEGORY,
      },
      {
        id: "3.6",
        label: "Màu sắc",
        path: "colors",
        permissions: EPermissions.READ_COLOR,
      },
      {
        id: "3.7",
        label: "Loại phiếu giảm giá",
        path: "voucherTypes",
        permissions: EPermissions.READ_VOUCHER_TYPE,
      },
      {
        id: "3.8",
        label: "Phiếu giảm giá",
        path: "vouchers",
        permissions: EPermissions.READ_VOUCHER,
      },
      {
        id: "3.9",
        label: "Loại sản phẩm",
        path: "product-types",
        permissions: EPermissions.READ_PRODUCT_TYPE,
      },
    ],
  },
  {
    id: "4",
    label: "Quản lý đơn hàng",
    icon: { component: IoBagCheckOutline },
    items: [
      {
        id: "4.1",
        label: "Phương thức thanh toán",
        path: "payment-types",
        permissions: EPermissions.READ_PAYMENT_TYPE,
      },
      {
        id: "4.2",
        label: "Trạng thái thanh toán",
        path: "payment-statuses",
        permissions: EPermissions.READ_PAYMENT_STATUS,
      },
      {
        id: "4.3",
        label: "Trạng thái đơn hàng",
        path: "order-statuses",
        permissions: EPermissions.READ_ORDER_STATUS,
      },
      {
        id: "4.4",
        label: "Đơn hàng",
        path: "orders",
        permissions: EPermissions.READ_ORDER,
      },
    ],
  },
  {
    id: "5",
    label: "Hệ thống",
    icon: { component: IoSettingsOutline },
    items: [
      {
        id: "5.1",
        label: "Cài đặt chung",
      },
      {
        id: "3.15",
        label: "Quản lý hiển thị",
        path: "flag-pages",
        permissions: EPermissions.READ_FLAG_PAGE,
      },
    ],
  },
  {
    id: "6",
    label: "Thành phần",
    path: "components",
    icon: { component: RxComponent1 },
  },
];
