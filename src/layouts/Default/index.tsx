import { Outlet } from "react-router-dom";
import TopBar from "@/components/layout/TopBar";
import Copyright from "@/components/layout/Copyright";
import DesktopSidebar from "@/components/layout/DesktopSidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/services/reducers";
import { AppDispatch } from "@/services/store";
import { setMobileMenu } from "@/services/store/app/app.slice";
import clsx from "clsx";

const DefaultLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mobileMenu } = useSelector((state: RootStateType) => state.app);
  return (
    <div className="flex h-dvh select-none bg-gray-25">
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-20 h-full w-full bg-black-800 bg-opacity-35 transition-[visibility,opacity] md:hidden",
          mobileMenu ? "visible opacity-100" : "invisible opacity-0",
        )}
        onClick={() => dispatch(setMobileMenu(false))}
      ></div>
      <DesktopSidebar />
      <MobileSidebar isOpen={mobileMenu} />
      <div className="relative grow md:ml-[264px]">
        <TopBar />
        <main className="ml-0 flex flex-col gap-6 overflow-y-scroll p-6">
          <Outlet />
          <Copyright />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
