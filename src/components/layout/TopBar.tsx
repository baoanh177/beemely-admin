import { IoCalendarClearOutline, IoMailOutline, IoSearchOutline } from "react-icons/io5";
import UserSettings from "./UserSettings";
import IconHasBadge from "@/components/common/IconHasBadge";
import { PiBell } from "react-icons/pi";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";

const TopBar = () => {
  return (
    <div className="flex h-12 items-center justify-between rounded-lg bg-white p-2 shadow-sm">
      {/* Search */}
      <div className="relative hidden w-full max-w-[658px] items-center gap-2 px-2 md:flex">
        <div className="flex h-6 w-6 items-center justify-center py-2">
          <IoSearchOutline className="text-[18px]" />
        </div>
        <input
          type="text"
          className="placeholder:text-m-medium text-m-medium peer h-full w-full bg-transparent py-2 placeholder-gray-400 outline-none"
          placeholder="Search"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-primary-400 transition-size duration-300 peer-focus:w-full"></div>
      </div>

      <HiOutlineBars3BottomLeft className="block shrink-0 cursor-pointer text-[20px] md:hidden" />

      {/* Actions */}
      <div className="flex h-full items-center gap-4 shrink-0">
        <IconHasBadge icon={<IoCalendarClearOutline className="text-[18px] text-gray-400" />} badge={0} />
        <IconHasBadge icon={<PiBell className="text-[18px] text-gray-400" />} badge={2} />
        <IconHasBadge icon={<IoMailOutline className="text-[18px] text-gray-400" />} badge={2} />
        <div className="h-full border border-gray-50"></div>
        <UserSettings />
      </div>
    </div>
  );
};

export default TopBar;
