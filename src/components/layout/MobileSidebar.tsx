import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import clsx from "clsx";
import Menu from "./Menu";

const MobileSidebar = ({ isOpen }: { isOpen: boolean }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={clsx(
        "fixed bottom-0 left-0 top-0 z-50 flex w-[90%] max-w-[264px] flex-col overflow-hidden bg-white transition-transform duration-300 md:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full",
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

export default MobileSidebar;
