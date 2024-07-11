import { PageNames } from "@/shared/enums/pageNames";
import clsx from "clsx";
import { FaCaretRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import lodash from "lodash";
import { useMemo } from "react";
import { GoHome } from "react-icons/go";

type PageNameKeys = keyof typeof PageNames;

const Breadcrumb = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const arrayPath = useMemo(() => {
    const arr = lodash.remove(pathname.split("/"));
    if (arr.includes("detail")) {
      return arr.slice(0, arr.indexOf("detail") + 1);
    } else if (arr.includes("edit")) {
      return arr.slice(0, arr.indexOf("edit") + 1);
    }
    return arr;
  }, [pathname]);

  return (
    <div className="flex items-center gap-2">
      <div
        className={clsx("text-m-medium cursor-pointer text-primary-500")}
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        <GoHome className="text-[18px]" />
      </div>
      {!!arrayPath.length && <FaCaretRight className="text-m-medium text-primary-200" />}
      {arrayPath.map((path, index) => {
        const isActive = index === arrayPath.length - 1;
        return (
          <Fragment key={index}>
            <div
              className={clsx("text-m-medium cursor-pointer text-primary-500", isActive && "cursor-default !text-gray-500")}
              onClick={() => {
                !isActive && navigate(`/${arrayPath.slice(0, index + 1).join("/")}`);
              }}
            >
              {PageNames[path as PageNameKeys] ?? path.at(0)?.toUpperCase() + path.slice(1)}
            </div>
            {!isActive && <FaCaretRight className="text-m-medium text-primary-200" />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
