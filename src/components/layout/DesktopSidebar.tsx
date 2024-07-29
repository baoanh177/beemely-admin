import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import logo from "@/assets/images/logo.png";
import clsx from "clsx";

const DesktopSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside
      className={clsx(
        "fixed bottom-0 left-0 top-0 z-50 flex w-[264px] -translate-x-full",
        "flex-col overflow-hidden bg-white transition-transform md:translate-x-0",
      )}
    >
      {/* Logo */}
      <div className="flex cursor-pointer items-center gap-3 px-5 py-6" onClick={() => navigate("/")}>
        <img src={logo} alt="" className="h-[34px] w-[34px]" />
        <div className="display-m-semibold">Beemely</div>
      </div>

      <Menu />
    </aside>
  );
};

export default DesktopSidebar;
