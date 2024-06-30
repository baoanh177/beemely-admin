import { FaCaretDown } from "react-icons/fa";

const UserSettings = () => {
  return (
    <div className="flex h-full cursor-pointer items-center gap-3">
      {/* Avatar */}
      <div className="relative h-8 w-8 rounded-circle bg-gray-100 shrink-0">
        <div className="absolute bottom-0 right-0 h-[10px] w-[10px] rounded-circle border-2 border-white bg-green-500"></div>
      </div>
      {/* Info */}
      <div className="shrink-0">
        <div className="text-m-medium text-black-500">Jay Hargudson</div>
        <div className="text-s-medium text-black-400">Manager</div>
      </div>
      <FaCaretDown className="text-gray-400 shrink-0" />
    </div>
  );
};

export default UserSettings;
