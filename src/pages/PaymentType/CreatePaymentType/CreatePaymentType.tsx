import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import PaymentTypeForm, { IPaymentTypeFormInitialValues } from "../PaymentTypeForm";
import { IPaymentTypeInitialState, resetStatus } from "@/services/store/paymentType/paymentType.slice";

const CreatePaymentType = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IPaymentTypeFormInitialValues>>(null);
  const { state } = useArchive<IPaymentTypeInitialState>("paymentType");

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

  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Heading
        title="Tạo mới Loại thanh toán"
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
            text: "Tạo mới Loại thanh toán",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <PaymentTypeForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreatePaymentType;
