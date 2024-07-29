import clsx from "clsx";
import { FaCaretUp } from "react-icons/fa";
import { IoPieChartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { IMenuItem } from "@/data/menu-items";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/services/store";
import { setMobileMenu } from "@/services/store/app/app.slice";

interface IMenuItemProps extends IMenuItem {
  isOpen?: boolean;
  isActive?: boolean;
  hasChildren?: boolean;
  isChildActive?: boolean;
  isChild?: boolean;
}

const MenuItem = ({
  icon,
  label,
  path,
  onClick,
  isChild = false,
  isActive = false,
  hasChildren = false,
  isChildActive = false,
  isOpen = false,
}: IMenuItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const IconComponent = icon?.component;

  return (
    <div
      className={clsx(
        `group relative flex cursor-pointer items-center justify-between bg-white px-6 py-3 transition-colors hover:bg-primary-50`,
        (isActive || isChildActive) && "!bg-primary-50",
      )}
      onClick={() => {
        if (path) {
          navigate(path);
          dispatch(setMobileMenu(false));
        } else if (onClick) {
          onClick();
        }
      }}
    >
      <div
        className={clsx(
          "absolute bottom-0 left-0 top-0 h-full w-1 -translate-x-full bg-primary-500 transition-transform",
          isActive && "translate-x-0",
        )}
      />

      <div className="flex items-center gap-2">
        {IconComponent && (
          <IconComponent
            className={clsx(
              "shrink-0 text-2xl group-hover:text-primary-500",
              icon.className,
              (isActive || isChildActive || isOpen) && "text-primary-500",
            )}
          />
        )}
        {isChild && <IoPieChartOutline className="invisible text-2xl" />}
        <span
          className={clsx(
            "text-m-semibold shrink-0 text-black-400 group-hover:text-primary-500",
            (isActive || isChildActive || isOpen) && "text-primary-500",
          )}
        >
          {label}
        </span>
      </div>
      {hasChildren && (
        <FaCaretUp
          className={clsx(
            "text-lg text-gray-400 transition-transform group-hover:text-primary-500",
            isChildActive && "text-primary-500",
            isOpen && "rotate-180 text-primary-500",
          )}
        />
      )}
    </div>
  );
};

export default MenuItem;
