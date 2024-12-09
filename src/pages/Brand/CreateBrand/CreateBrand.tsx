import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IBrandInitialState, resetStatus } from "@/services/store/brand/brand.slice";
import { FormikProps } from "formik";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BrandForm from "../BrandForm";
import { IBrand } from "@/services/store/brand/brand.model";

const CreateBrand = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<Omit<IBrand, "productCount">>>(null);
  const { state } = useArchive<IBrandInitialState>("brand");

  useFetchStatus({
    module: "brand",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/brands",
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
        title="Tạo mới Thương hiệu"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/brands");
            },
          },
          {
            text: "Tạo mới Thương hiệu",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <BrandForm type="create" FormikRefType={formikRef} />
    </>
  );
};

export default CreateBrand;
