import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import PaymentStatusForm, { IPaymentStatusFormInitialValues } from "../PaymentStatusForm";
import { IPaymentStatusInitialState, resetStatus } from "@/services/store/paymentStatus/paymentStatus.slice";

const CreatePaymentStatus = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IPaymentStatusFormInitialValues>>(null);
  const { state } = useArchive<IPaymentStatusInitialState>("paymentStatus");

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

  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Heading
        title="Tạo mới Trạng thái thanh toán"
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
            text: "Tạo mới Trạng thái thanh toán",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <PaymentStatusForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreatePaymentStatus;
