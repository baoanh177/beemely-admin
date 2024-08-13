import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import VoucherTypeForm, { IVoucherTypeFormInitialValues } from "../VoucherTypeForm";
import { IVoucherTypeInitialState, resetStatus } from "@/services/store/voucherType/voucherType.slice";

const CreateVoucherType = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IVoucherTypeFormInitialValues>>(null);
  const { state } = useArchive<IVoucherTypeInitialState>("voucherType");

  useFetchStatus({
    module: "voucherType",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/voucherTypes",
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
        title="Tạo mới Loại mã giảm giá"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/voucherTypes");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Tạo mới Loại mã giảm giá",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <VoucherTypeForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateVoucherType;
