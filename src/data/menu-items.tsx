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
    label: "Dashboard",
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
        label: "Orders",
        path: "orders",
        permissions: EPermissions.READ_ORDER,
      },
      {
        id: "2.1",
        label: "Products",
        path: "products",
        permissions: EPermissions.READ_PRODUCT,
      },
    ],
  },
  {
    id: "3",
    label: "System",
    icon: { component: IoSettingsOutline },
    items: [
      {
        id: "3.1",
        label: "Roles",
        path: "roles",
        permissions: EPermissions.READ_ROLE,
      },
      {
        id: "3.2",
        label: "Permissions",
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
        label: "Voucher-Type",
        path: "voucherTypes",
        permissions: EPermissions.READ_VOUCHER_TYPE,
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
