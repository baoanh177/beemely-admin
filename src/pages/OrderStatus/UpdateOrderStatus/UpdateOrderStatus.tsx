import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import OrderStatusForm, { IOrderStatusFormInitialValues } from "../OrderStatusForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import { getOrderStatusById } from "@/services/store/orderStatus/orderStatus.thunk";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IOrderStatusInitialState, resetStatus } from "@/services/store/orderStatus/orderStatus.slice";
import { EFetchStatus } from "@/shared/enums/status";

const UpdateOrderStatus = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IOrderStatusFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IOrderStatusInitialState>("orderStatus");

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

  const { getOrderStatusByIdLoading } = useAsyncEffect(
    (async) => id && async(dispatch(getOrderStatusById({ param: id })), "getOrderStatusByIdLoading"),
    [id],
  );

  useEffect(() => {
    if (state.activeOrderStatus) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeOrderStatus.name,
          description: state.activeOrderStatus.description,
        });
      }
    }
  }, [state.activeOrderStatus]);

  return (
    <>
      <Heading
        title="Cập nhật Trạng thái đơn hàng"
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
            text: "Lưu thay đổi",
            icon: <IoSaveOutline className="text-[18px]" />,
            onClick: () => {
              if (formikRef.current) {
                formikRef.current.handleSubmit();
              }
            },
          },
        ]}
      />
      {state.activeOrderStatus && (
        <OrderStatusForm
          type="update"
          isFormLoading={getOrderStatusByIdLoading ?? true}
          formikRef={formikRef}
          orderStatus={state.activeOrderStatus}
        />
      )}
    </>
  );
};

export default UpdateOrderStatus;
