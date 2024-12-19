import { Modal, Tooltip } from "antd";
import { HiOutlinePencil } from "react-icons/hi2";
import { IoEyeOutline, IoTrashBinOutline } from "react-icons/io5";

import { EButtonTypes } from "@/shared/enums/button";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { useArchive } from "@/hooks/useArchive";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { checkPermission } from "@/utils/checkPermission";
import { GoLock, GoUnlock } from "react-icons/go";
import { EActiveStatus } from "@/shared/enums/status";
import { IoWarningOutline } from "react-icons/io5";
import clsx from "clsx";

interface IGridButtonsProps {
  buttons: IGridButton[];
  record: { key: string; [key: string]: any };
  hides: Record<EButtonTypes, boolean>;
}

const { confirm } = Modal;

const GridButtons = ({ buttons, record, hides }: IGridButtonsProps) => {
  const { state } = useArchive<IAuthInitialState>("auth");
  return (
    <div className="flex items-center justify-center gap-3">
      {buttons.map((button, index) => {
        let canAccess = true;
        let canDelete = true;
        let canUpdate = true;
        if (button.permission) {
          canAccess = checkPermission(state.profile?.listNamePermission, button.permission);
        }

        if (record.productCount && record.productCount > 0) {
          canDelete = false;
        }
        if (record.orderCount && record.orderCount > 0) {
          canDelete = false;
          canUpdate = false;
        }

        if (record.enableDelete !== undefined && record.enableDelete !== null && record.enableDelete === false) {
          canDelete = false;
        }

        const canDisplay = canAccess && !(hides[button.type] ?? false);

        switch (button.type) {
          case EButtonTypes.ACTIVE:
            return (
              canDisplay &&
              (record.status === EActiveStatus.ACTIVE ? (
                <Tooltip title="Bỏ kích hoạt?" key={index}>
                  <GoUnlock
                    className="cursor-pointer text-xl text-green-500"
                    onClick={() => {
                      confirm({
                        title: "Bỏ kích hoạt",
                        content: "Bạn có chắc chắn muốn bỏ kích hoạt bản ghi này?",
                        onOk: () => button.onClick(record),
                      });
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Kích hoạt?" key={index}>
                  <GoLock
                    className="cursor-pointer text-xl text-red-500"
                    onClick={() => {
                      confirm({
                        title: "Kích hoạt",
                        content: "Bạn có chắc chắn muốn kích hoạt bản ghi này?",
                        onOk: () => button.onClick(record),
                      });
                    }}
                  />
                </Tooltip>
              ))
            );
          case EButtonTypes.VIEW:
            return (
              canDisplay && (
                <Tooltip title="Xem chi tiết" key={index}>
                  <IoEyeOutline className="cursor-pointer text-xl text-blue-500" onClick={() => button.onClick(record)} />
                </Tooltip>
              )
            );
          case EButtonTypes.UPDATE:
            return (
              canDisplay &&
              canUpdate && (
                <Tooltip title="Cập nhật" key={index}>
                  <HiOutlinePencil className="cursor-pointer text-xl text-yellow-500" onClick={() => button.onClick(record)} />
                </Tooltip>
              )
            );
          case EButtonTypes.DELETE:
            return (
              canDisplay && (
                <Tooltip title={canDelete ? "Xóa" : "Không thể xóa"} key={index}>
                  <IoTrashBinOutline
                    className={clsx("cursor-pointer text-xl", canDelete ? "text-red-500" : "text-gray-300")}
                    onClick={() =>
                      confirm({
                        title: canDelete ? "Xóa bản ghi?" : "Không thể xóa!",
                        closable: true,
                        icon: <IoWarningOutline className="mr-2 h-6 w-6 text-orange-400" />,
                        content: canDelete
                          ? "Bạn có chắc chắn muốn xóa bản ghi này, sau khi xóa sẽ không thể khôi phục!"
                          : "Bản ghi này liên quan tới các bản ghi khác, bạn không thể xóa!",
                        onOk: canDelete ? () => button.onClick(record) : () => {},
                      })
                    }
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
