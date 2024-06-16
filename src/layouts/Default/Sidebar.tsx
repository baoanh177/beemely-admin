import { PropsWithChildren, ReactNode } from "react";
import lodash from "lodash";

// Icons
import { IoPieChartOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { LuUsers } from "react-icons/lu";

interface IMenuItem {
  label: string;
  path?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const Sidebar = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activePath = lodash.last(lodash.remove(pathname.split("/")));
  const menuItems: IMenuItem[] = [
    {
      label: "Dashboard",
      path: "dashboard",
      icon: <IoPieChartOutline className="text-2xl" />,
    },
    {
      label: "Accounts",
      path: "accounts",
      icon: <LuUsers className="text-2xl" />,
    },
  ];

  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white px-3 py-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => {
              return (
                <li key={index}>
                  <div
                    onClick={() => {
                      if (item.path) {
                        navigate(`/${item.path}`);
                      } else {
                        item.onClick && item.onClick();
                      }
                    }}
                    className={clsx(
                      "group flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
                      activePath == item.path && "bg-gray-100 dark:bg-gray-700",
                    )}
                  >
                    {item.icon}
                    <span className="ms-3">{item.label}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      <div className="h-screen bg-gray-50 p-6 sm:ml-64 overflow-y-scroll overflow-x-hidden">{children}</div>
    </div>
  );
};

export default Sidebar;
