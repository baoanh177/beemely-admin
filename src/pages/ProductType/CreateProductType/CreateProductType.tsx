import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import { IProductTypeInitialState, resetStatus } from "@/services/store/productType/productType.slice";
import { EFetchStatus } from "@/shared/enums/status";
import { FormikProps } from "formik";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProductTypeForm, { IProductTypeFormInitialValues } from "../ProductTypeForm";
import useFetchStatus from "@/hooks/useFetchStatus";

const CreateProductType = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IProductTypeFormInitialValues>>(null);
  const { state } = useArchive<IProductTypeInitialState>("productType");
  useFetchStatus({
    module: "productType",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/product-types",
      },
      error: {
        message: state.message,
      },
    },
  });
  console.log(formikRef);
  const handleSubmit = () => {
    if (formikRef.current) {
      console.log(formikRef);
      formikRef.current.handleSubmit();
    }
  };
  return (
    <>
      <Heading
        title="Tạo mới Loại sản phẩm"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/product-types");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Tạo mới Loại sản phảm",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <ProductTypeForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateProductType;
