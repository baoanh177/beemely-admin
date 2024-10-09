import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { FormikProps } from "formik";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ShippingMethodForm from "../ShippingMethodForm";
import { IShippingMethod } from "@/services/store/shippingMethod/shippingMethod.model";
import { IShippingMethodInitialState, resetStatus } from "@/services/store/shippingMethod/shippingMethod.slice";

const CreateShippingMethod = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IShippingMethod>>(null);
  const { state } = useArchive<IShippingMethodInitialState>("shippingMethod");

  useFetchStatus({
    module: "shippingMethod",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/shipping-methods",
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
        title="Tạo mới Phương thức vận chuyển"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/shipping-methods");
            },
          },
          {
            text: "Tạo mới Thương hiệu",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <ShippingMethodForm type="create" FormikRefType={formikRef} />
    </>
  );
};

export default CreateShippingMethod;
