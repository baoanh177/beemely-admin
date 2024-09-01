import { EPermissions } from "@/shared/enums/permissions";
import { IconType } from "react-icons";
import { IoCartOutline, IoPieChartOutline, IoSettingsOutline } from "react-icons/io5";
import { RxComponent1 } from "react-icons/rx";

export interface IMenuItem {
  id: string;
  label: string;
  path?: string;
  icon?: {
    component: IconType;
    className?: string;
  };
  items?: Pick<IMenuItem, Exclude<keyof IMenuItem, "items" | "icon">>[];
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
    label: "E-Commerce",
    icon: { component: IoCartOutline },
    items: [
      {
        id: "2.3",
        label: "Đơn hàng",
        path: "orders",
        permissions: EPermissions.READ_ORDER,
      },
      {
        id: "2.1",
        label: "Sản phẩm",
        path: "products",
        permissions: EPermissions.READ_PRODUCT,
      },
      {
        id: "2.2",
        label: "Thẻ",
        path: "tags",
        permissions: EPermissions.READ_TAG,
      },
      {
        id: "2.3",
        label: "Giới tính",
        path: "genders",
        permissions: EPermissions.READ_GENDER,
      },
      {
        id: "2.4",
        label: "Thương hiệu",
        path: "brands",
        permissions: EPermissions.READ_BRAND,
      },
      {
        id: "2.5",
        label: "Nhãn",
        path: "labels",
        permissions: EPermissions.READ_LABEL,
      },
    ],
  },
  {
    id: "3",
    label: "Hệ thống",
    icon: { component: IoSettingsOutline },
    items: [
      {
        id: "3.1",
        label: "Tài khoản",
        path: "accounts",
        permissions: EPermissions.READ_ACCOUNT,
      },
      {
        id: "3.2",
        label: "Vai trò",
        path: "roles",
        permissions: EPermissions.READ_ROLE,
      },
      {
        id: "3.3",
        label: "Quyền",
        path: "permissions",
        permissions: EPermissions.READ_PERMISSION,
      },
      {
        id: "3.3",
        label: "Tags",
        path: "tags",
        permissions: EPermissions.READ_TAG,
      },
      {
        id: "3.4",
        label: "Genders",
        path: "genders",
        permissions: EPermissions.READ_GENDER,
      },
      {
        id: "3.5",
        label: "Brands",
        path: "brands",
        permissions: EPermissions.READ_BRAND,
      },
      {
        id: "3.6",
        label: "Labels",
        path: "labels",
        permissions: EPermissions.READ_LABEL,
      },
      {
        id: "3.7",
        label: "Color",
        path: "colors",
        permissions: EPermissions.READ_COLOR,
      },
      {
        id: "3.8",
        label: "Voucher",
        path: "vouchers",
        permissions: EPermissions.READ_VOUCHER,
      },
      {
        id: "3.9",
        label: "Voucher-Type",
        path: "voucherTypes",
        permissions: EPermissions.READ_VOUCHER_TYPE,
      },
      {
        id: "3.10",
        label: "UserGender",
        path: "user-genders",
        permissions: EPermissions.READ_USER_GENDER,
      },
      {
        id: "3.11",
        label: "Size",
        path: "sizes",
        permissions: EPermissions.READ_SIZE,
      },
      {
        id: "3.12",
        label: "Payment-Type",
        path: "payment-types",
        permissions: EPermissions.READ_PAYMENT_TYPE,
      },
      {
        id: "3.13",
        label: "Payment-status",
        path: "payment-statuses",
        permissions: EPermissions.READ_PAYMENT_STATUS,
      },
      {
        id: "3.14",
        label: "OrderStatus",
        path: "order-statuses",
        permissions: EPermissions.READ_ORDER_STATUS,
      },
      {
        id: "3.15",
        label: "Loại sản phẩm",
        path: "product-types",
        permissions: EPermissions.READ_PRODUCT_TYPE,
      },
    ],
  },
  {
    id: "5",
    label: "Components",
    path: "components",
    icon: { component: RxComponent1 },
  },
];
