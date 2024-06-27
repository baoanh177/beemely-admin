import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IMenuItem } from "./Sidebar";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { IoPieChartOutline } from "react-icons/io5";

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
  const IconComponent = icon?.component;

  return (
    <>
      <div
        className={clsx(
          "group relative flex cursor-pointer items-center justify-between bg-white px-6 py-3 transition-colors hover:bg-primary-50",
          (isActive || isChildActive) && "!bg-primary-50",
        )}
        onClick={() => {
          path ? navigate(path) : onClick && onClick();
        }}
      >
        <div
          className={clsx(
            "absolute bottom-0 left-0 top-0 h-full w-1 -translate-x-full bg-primary-500 transition-transform",
            isActive && "translate-x-0",
          )}
        ></div>

        <div className="flex items-center gap-2">
          {IconComponent && (
            <IconComponent
              className={clsx(
                "text-2xl group-hover:text-primary-500",
                icon.className,
                (isActive || isChildActive) && "text-primary-500",
              )}
            />
          )}
          {isChild && <IoPieChartOutline className="invisible text-2xl" />}
          <span
            className={clsx(
              "text-m-semibold text-black-400 group-hover:text-primary-500",
              (isActive || isChildActive) && "text-primary-500",
            )}
          >
            {label}
          </span>
        </div>
        {hasChildren &&
          (isOpen ? (
            <FaCaretDown className={clsx("text-lg text-primary-500")} />
          ) : (
            <FaCaretUp className="text-lg text-gray-400 group-hover:text-primary-500" />
          ))}
      </div>
    </>
  );
};

export default MenuItem;
