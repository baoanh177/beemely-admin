import lodash from "lodash";
import { PropsWithChildren, useState } from "react";
import { IconType } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";

import MenuItem from "./MenuItem";

// Icons
import { IoCartOutline, IoPieChartOutline, IoSettingsOutline } from "react-icons/io5";

// Images
import logo from "@/assets/images/logo.png";
import { RxComponent1 } from "react-icons/rx";
import { EPermissions } from "@/shared/enums/permissions";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { checkPermission } from "@/helpers/checkPermission";

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

const Sidebar = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const { state } = useArchive<IAuthInitialState>("auth");

  const [activeMenuItemId, setActiveMenuItemId] = useState<string | null>();
  const [openingMenuId, setOpeningMenuId] = useState<string | null>();
  const { pathname } = useLocation();
  const activePath = lodash.last(lodash.remove(pathname.split("/")));
  const menuItems: IMenuItem[] = [
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
      ],
    },
    {
      id: "5",
      label: "Components",
      path: "components",
      icon: { component: RxComponent1 },
    },
  ];

  return (
    <>
      {/* Page parent */}
      <div className="flex h-dvh select-none bg-gray-25">
        <aside className="fixed bottom-0 left-0 top-0 z-40 flex w-[264px] flex-col bg-white">
          {/* Logo */}
          <div className="flex cursor-pointer items-center gap-3 px-5 py-6" onClick={() => navigate("/")}>
            <img src={logo} alt="" className="h-[34px] w-[34px]" />
            <div className="display-m-semibold">Beemely</div>
          </div>

          {/* Navbar */}
          <nav className="no-scrollbar mb-2 flex grow flex-col gap-2 overflow-y-scroll pt-4">
            {menuItems.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-2">
                  {/* Parent Item */}
                  {checkPermission(state.profile?.listNamePermission, item.permissions) && (
                    <MenuItem
                      onClick={() => {
                        setActiveMenuItemId(activeMenuItemId === item.id ? null : item.id);
                        setOpeningMenuId(openingMenuId === item.id ? null : item.id);
                      }}
                      {...item}
                      isOpen={item.id === openingMenuId}
                      hasChildren={!!item.items?.length}
                      isActive={!!item.path && item.path === activePath}
                      isChildActive={item.items?.some((i) => !!i.path && i.path === activePath)}
                    />
                  )}
                  {/* Child Item */}
                  {activeMenuItemId === item.id &&
                    item.items?.some((child) => checkPermission(state.profile?.listNamePermission, child.permissions)) && (
                      <div className="flex flex-col gap-2">
                        {item.items?.map((child, index) => {
                          return (
                            checkPermission(state.profile?.listNamePermission, child.permissions) && (
                              <MenuItem key={index} {...child} isChild isActive={child.path === activePath} />
                            )
                          );
                        })}
                      </div>
                    )}
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="ml-[264px] flex grow flex-col gap-6 overflow-y-scroll p-6">{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
