import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CategoryForm, { ICategoryFormInitialValues } from "../CategoryForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ICategoryInitialState, resetStatus } from "@/services/store/category/category.slice";
import { useArchive } from "@/hooks/useArchive";

const CreateCategory = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<ICategoryFormInitialValues>>(null);
  const { state } = useArchive<ICategoryInitialState>("category");

  useFetchStatus({
    module: "category",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/categories",
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
        title="Tạo mới Danh mục"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/categories");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Tạo mới Danh mục",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <CategoryForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateCategory;
