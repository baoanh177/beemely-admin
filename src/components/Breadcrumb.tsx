import { PageNames } from "@/shared/enums/pageNames";
import clsx from "clsx";
import { FaCaretRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

interface IBreadcrumbProps {
  pages: { path: keyof typeof PageNames; onClick?: Function; isActive?: boolean }[];
}

const Breadcrumb = ({ pages }: IBreadcrumbProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log("🦎 ~ Breadcrumb ~ location:", location)
  return (
    <div className="flex items-center gap-2">
      {pages.map((page, index) => {
        return (
          <Fragment key={index}>
            <div className={clsx("text-m-medium text-gray-500", page.isActive && "text-primary-500")}
              onClick={() => {
                page.onClick ? page.onClick() : navigate("")
              }}
            >
              {PageNames[page.path]}
            </div>
            {!page.isActive && <FaCaretRight className="text-m-medium text-gray-200" />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
