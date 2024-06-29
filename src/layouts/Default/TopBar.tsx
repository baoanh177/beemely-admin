import { IoCalendar, IoMail, IoSearchOutline } from "react-icons/io5";
import UserSettings from "./UserSettings";
import IconHasBadge from "@/components/IconHasBadge";
import { FaBell } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="flex h-10 items-center justify-between">
      {/* Search */}
      <div className="relative flex w-full max-w-[658px] items-center gap-2 px-2">
        <div className="flex h-6 w-6 items-center justify-center py-2">
          <IoSearchOutline className="text-[18px]" />
        </div>
        <input
          type="text"
          className="peer placeholder:text-m-medium text-m-medium h-full w-full bg-transparent py-2 placeholder-gray-400 outline-none"
          placeholder="Search"
        />
        <div className="absolute left-0 bottom-0 right-0 w-0 peer-focus:w-full h-[1px] bg-primary-400 transition-size duration-300"></div>
      </div>

      {/* Actions */}
      <div className="flex h-full items-center gap-4">
        <IconHasBadge icon={<IoCalendar className="text-[18px] text-gray-400" />} badge={0} />
        <IconHasBadge icon={<FaBell className="text-[18px] text-gray-400" />} badge={2} />
        <IconHasBadge icon={<IoMail className="text-[18px] text-gray-400" />} badge={2} />
        <div className="h-full border border-gray-50"></div>
        <UserSettings />
      </div>
    </div>
  );
};

export default TopBar;
