import { Modal, Tooltip } from "antd";
import { HiOutlinePencil } from "react-icons/hi2";
import { IoEyeOutline, IoTrashBinOutline } from "react-icons/io5";

import { EButtonTypes } from "@/shared/enums/button";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { checkPermission } from "@/helpers/checkPermission";

interface IGridButtonsProps {
  buttons: IGridButton[];
  record: { key: string; [key: string]: any };
}

const { confirm } = Modal;

const GridButtons = ({ buttons, record }: IGridButtonsProps) => {
  const { state } = useArchive<IAuthInitialState>("auth");
  return (
    <div className="flex items-center justify-center gap-3">
      {buttons.map((button, index) => {
        let canAccess = true;
        if (button.permission) {
          canAccess = checkPermission(state.profile?.listNamePermission, button.permission)
        }
        switch (button.type) {
          case EButtonTypes.VIEW:
            return (
              canAccess && (
                <Tooltip title="View" key={index}>
                  <IoEyeOutline className="cursor-pointer text-xl text-blue-500" onClick={() => button.onClick(record)} />
                </Tooltip>
              )
            );
          case EButtonTypes.UPDATE:
            return (
              canAccess && (
                <Tooltip title="Edit" key={index}>
                  <HiOutlinePencil className="cursor-pointer text-xl text-yellow-500" onClick={() => button.onClick(record)} />
                </Tooltip>
              )
            );
          case EButtonTypes.DELETE:
            return (
              canAccess && (
                <Tooltip title="Delete" key={index}>
                  <IoTrashBinOutline
                    className="cursor-pointer text-xl text-red-500"
                    onClick={() => {
                      confirm({
                        title: "Delete",
                        content: "Are you sure you want to delete this record?",
                        onOk: () => button.onClick(record),
                      });
                    }}
                  />
                </Tooltip>
              )
            );
        }
      })}
    </div>
  );
};

export default GridButtons;
