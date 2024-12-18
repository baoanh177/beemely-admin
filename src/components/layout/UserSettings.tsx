import { FaCaretDown } from "react-icons/fa";
import { Dropdown, MenuProps, Modal } from "antd";
import { IoLogOutOutline, IoWarning } from "react-icons/io5";
import { useArchive } from "@/hooks/useArchive";
import { logout } from "@/services/store/auth/auth.thunk";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";

const { confirm } = Modal;

const UserSettings = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex items-center gap-1 text-red-500">
          <IoLogOutOutline className="text-xl" />
          Đăng xuất
        </div>
      ),
      onClick() {
        confirm({
          title: (
            <div className="flex items-center gap-2">
              <IoWarning className="text-2xl text-yellow-500" />
              <span>Đăng xuất?</span>
            </div>
          ),
          icon: null,
          content: "Bạn có chắc chắn muốn đăng xuất không?",
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
        <div className="hidden shrink-0 md:block">
          <div className="text-m-medium text-black-500">{state.profile?.fullName}</div>
          <div className="text-s-medium text-black-400">{state.profile?.listNameRole?.at(0)}</div>
        </div>
        <FaCaretDown className="hidden shrink-0 text-gray-400 md:block" />
      </div>
    </Dropdown>
  );
};

export default UserSettings;
