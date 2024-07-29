import { menuItems } from "@/data/menu-items";
import { checkPermission } from "@/utils/checkPermission";
import MenuItem from "./MenuItem";
import { useLocation } from "react-router-dom";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { useState } from "react";
import lodash from "lodash";

const Menu = () => {
  const { state } = useArchive<IAuthInitialState>("auth");

  const [activeMenuItemId, setActiveMenuItemId] = useState<string | null>();
  const [openingMenuId, setOpeningMenuId] = useState<string | null>();
  const { pathname } = useLocation();
  const activePath = lodash.last(lodash.remove(pathname.split("/")));

  return (
    <>
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
    </>
  );
};

export default Menu;
