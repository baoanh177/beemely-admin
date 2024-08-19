import { useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import PaymentStatusForm, { IPaymentStatusFormInitialValues } from "../PaymentStatusForm";
import { IPaymentStatusInitialState, resetStatus } from "@/services/store/paymentStatus/paymentStatus.slice";
import { getPaymentStatusById } from "@/services/store/paymentStatus/paymentStatus.thunk";

const UpdatePaymentStatus = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IPaymentStatusFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IPaymentStatusInitialState>("paymentStatus");
  useFetchStatus({
    module: "paymentStatus",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/payment-statuses",
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getPaymentStatusByIdLoading } = useAsyncEffect(
    (async) => id && async(dispatch(getPaymentStatusById({ param: id })), "getPaymentStatusByIdLoading"),
    [id],
  );

  return (
    <>
      <Heading
        title="Cập nhật Trạng thái thanh toán"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/payment-statuses");
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
      {state.activePaymentStatus && (
        <PaymentStatusForm
          type="update"
          isFormLoading={getPaymentStatusByIdLoading ?? true}
          formikRef={formikRef}
          paymentStatus={state.activePaymentStatus}
        />
      )}
    </>
  );
};

export default UpdatePaymentStatus;
