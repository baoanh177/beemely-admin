import Heading from "@/components/layout/Heading";
import { EPermissions } from "@/shared/enums/permissions";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProductForm, { IProductFormInitialValues } from "../ProductForm";
import { useRef } from "react";
import { FormikProps } from "formik";

const CreateProduct = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IProductFormInitialValues>>(null);

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
            permission: EPermissions.CREATE_PERMISSION,
            onClick: () => navigate("/products/create"),
          },
        ]}
      />

      <ProductForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateProduct;
