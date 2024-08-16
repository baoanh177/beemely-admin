import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import OrderStatusForm, { IOrderStatusFormInitialValues } from "../OrderStatusForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import { IOrderStatusInitialState, resetStatus } from "@/services/store/orderStatus/orderStatus.slice";
import { EFetchStatus } from "@/shared/enums/status";

const CreateOrderStatus = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IOrderStatusFormInitialValues>>(null);
  const { state } = useArchive<IOrderStatusInitialState>("orderStatus");

  useFetchStatus({
    module: "orderStatus",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/order-statuses",
      },
      error: {
        message: state.message,
      },
    },
  });

  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Heading
        title="Tạo mới Trạng thái đơn hàng"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/order-statuses");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Tạo mới Trạng thái đơn hàng",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <OrderStatusForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateOrderStatus;
