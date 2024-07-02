import { Tooltip } from "antd";
import { HiOutlinePencil } from "react-icons/hi2";
import { IoEyeOutline, IoTrashBinOutline } from "react-icons/io5";

import useModal from "@/hooks/useModal";
import { ButtonTypes } from "@/shared/enums/button";
import { IGridButton } from "@/shared/utils/shared-interfaces";

interface IGridButtonsProps {
  buttons: IGridButton[];
  record: { [key: string]: unknown };
}

const GridButtons = ({ buttons, record }: IGridButtonsProps) => {
  const { showModal } = useModal();

  return (
    <div className="flex items-center justify-center gap-3">
      {buttons.map((button, index) => {
        switch (button.type) {
          case ButtonTypes.VIEW:
            return (
              <Tooltip title="View" key={index}>
                <IoEyeOutline className="cursor-pointer text-xl text-blue-500" onClick={() => button.onClick(record)} />
              </Tooltip>
            );
          case ButtonTypes.UPDATE:
            return (
              <Tooltip title="Edit" key={index}>
                <HiOutlinePencil className="cursor-pointer text-xl text-yellow-500" onClick={() => button.onClick(record)} />
              </Tooltip>
            );
          case ButtonTypes.DELETE:
            return (
              <Tooltip title="Delete" key={index}>
                <IoTrashBinOutline
                  className="cursor-pointer text-xl text-red-500"
                  onClick={() => {
                    showModal({
                      title: "Delete",
                      content: "Are you sure you want to delete this record?",
                      onConfirm: () => button.onClick(record),
                    });
                  }}
                />
              </Tooltip>
            );
        }
      })}
    </div>
  );
};

export default GridButtons;
