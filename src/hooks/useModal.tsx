import { Modal } from "antd";
import { ReactNode } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

const { confirm } = Modal;

interface IModalProps {
  icon?: ReactNode;
  title?: string;
  content?: string;
  onConfirm: Function;
  onCancel?: Function;
}

const useModal = () => {
  const showModal = ({
    icon,
    title = "Confirm",
    content = "Are you sure you want to perform this action",
    onConfirm,
    onCancel,
  }: IModalProps) => {
    confirm({
      icon: icon ?? (
        <RiErrorWarningFill className="mt-[2px] text-xl text-yellow-500" />
      ),
      title,
      content,
      onOk() {
        return onConfirm();
      },
      onCancel() {
        return onCancel && onCancel();
      },
    });
  };
  return { showModal };
};

export default useModal;
