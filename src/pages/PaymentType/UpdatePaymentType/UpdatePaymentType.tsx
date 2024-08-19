import { useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import PaymentTypeForm, { IPaymentTypeFormInitialValues } from "../PaymentTypeForm";
import { IPaymentTypeInitialState, resetStatus } from "@/services/store/paymentType/paymentType.slice";
import { getPaymentTypeById } from "@/services/store/paymentType/paymentType.thunk";

const UpdatePaymentType = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IPaymentTypeFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IPaymentTypeInitialState>("paymentType");
  useFetchStatus({
    module: "paymentType",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/payment-types",
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getPaymentTypeByIdLoading } = useAsyncEffect(
    (async) => id && async(dispatch(getPaymentTypeById({ param: id })), "getPaymentTypeByIdLoading"),
    [id],
  );

  return (
    <>
      <Heading
        title="Cập nhật Loại thanh toán"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/payment-types");
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
      {state.activePaymentType && (
        <PaymentTypeForm
          type="update"
          isFormLoading={getPaymentTypeByIdLoading ?? true}
          formikRef={formikRef}
          paymentType={state.activePaymentType}
        />
      )}
    </>
  );
};

export default UpdatePaymentType;
