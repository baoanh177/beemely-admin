import Heading from "@/components/layout/Heading";
import { EPermissions } from "@/shared/enums/permissions";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProductForm, { IProductFormInitialValues } from "../ProductForm";
import { useRef } from "react";
import { FormikProps } from "formik";
import useFetchStatus from "@/hooks/useFetchStatus";
import { resetStatus } from "@/services/store/product/product.slice";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.model";

const CreateProduct = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IProductFormInitialValues>>(null);
  const { state } = useArchive<IProductInitialState>("product");

  useFetchStatus({
    module: "product",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/products",
      },
      error: {
        message: state.message,
      },
    },
  });

  const handleSubmit2 = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Heading
        title="Thêm mới sản phẩm"
        hasBreadcrumb
        buttons={[
          {
            text: "Quay lại",
            type: "secondary",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/products");
            },
          },
          {
            text: "Tạo mới Sản phẩm",
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_PRODUCT,
            onClick: handleSubmit2,
          },
        ]}
      />

      <ProductForm type="create" FormikRefType={formikRef} />
    </>
  );
};

export default CreateProduct;
