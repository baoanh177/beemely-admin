import lodash from "lodash";
import { PropsWithChildren, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import logo from "@/assets/images/logo.png";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { checkPermission } from "@/utils/checkPermission";
import { menuItems } from "@/data/menu-items";

const Sidebar = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { state } = useArchive<IAuthInitialState>("auth");

  const [activeMenuItemId, setActiveMenuItemId] = useState<string | null>();
  const [openingMenuId, setOpeningMenuId] = useState<string | null>();
  const { pathname } = useLocation();
  const activePath = lodash.last(lodash.remove(pathname.split("/")));

  return (
    <>
      {/* Page parent */}
      <div className="flex h-dvh select-none bg-gray-25">
        <aside className="fixed bottom-0 left-0 top-0 z-50 flex w-[264px] -translate-x-full flex-col bg-white transition-transform md:translate-x-0">
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

        <main className="ml-0 flex grow flex-col gap-6 overflow-y-scroll p-6 md:ml-[264px]">{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
