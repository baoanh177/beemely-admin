import { FaCaretDown } from "react-icons/fa";
import { Dropdown, MenuProps, Modal } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { IoLogOutOutline, IoWarning } from "react-icons/io5";
import { useArchive } from "@/hooks/useArchive";
import { logout } from "@/services/store/auth/auth.thunk";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";

const { confirm } = Modal;

const UserSettings = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");

  // useFetchStatus({
  //   module: "auth",
  //   reset: resetStatus,
  //   actions: {
  //     success: {
  //       navigate: "/auth/login",
  //     },
  //     error: {
  //       message: state.message,
  //     },
  //   },
  // });

  const items: MenuProps["items"] = [
    {
      label: (
        <Link to="/profile" className="flex items-center gap-1">
          <AiOutlineUser className="text-xl" />
          <span>Profile</span>
        </Link>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="flex items-center gap-1 text-red-500">
          <IoLogOutOutline className="text-xl" />
          Logout
        </div>
      ),
      onClick() {
        confirm({
          title: (
            <div className="flex items-center gap-2">
              <IoWarning className="text-2xl text-yellow-500" />
              <span>Log out?</span>
            </div>
          ),
          icon: null,
          content: "Are you sure you want to log out?",
          onOk() {
            return dispatch(logout());
          },
        });
      },
      key: "3",
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div className="flex h-full cursor-pointer items-center gap-3">
        {/* Avatar */}
        <div className="relative h-8 w-8 shrink-0 rounded-circle bg-gray-100">
          <div className="absolute bottom-0 right-0 h-[10px] w-[10px] rounded-circle border-2 border-white bg-green-500"></div>
        </div>
        {/* Info */}
        <div className="shrink-0">
          <div className="text-m-medium text-black-500">{state.profile?.userName}</div>
          <div className="text-s-medium text-black-400">{state.profile?.listNameRole?.at(0)}</div>
        </div>
        <FaCaretDown className="shrink-0 text-gray-400" />
      </div>
    </Dropdown>
  );
};

export default UserSettings;
