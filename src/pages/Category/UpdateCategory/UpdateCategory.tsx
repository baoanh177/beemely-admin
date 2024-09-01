import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm, { ICategoryFormInitialValues } from "../CategoryForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ICategoryInitialState, resetStatus } from "@/services/store/category/category.slice";
import { useArchive } from "@/hooks/useArchive";
import { getCategoryById } from "@/services/store/category/category.thunk";
import useAsyncEffect from "@/hooks/useAsyncEffect";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<ICategoryFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<ICategoryInitialState>("category");
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

  const { getCategoryByIdLoading } = useAsyncEffect(
    (async) => id && async(dispatch(getCategoryById({ param: id })), "getCategoryByIdLoading"),
    [id],
  );

  useEffect(() => {
    if (state.activeCategory) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeCategory.name,
        });
      }
    }
  }, [state.activeCategory]);

  return (
    <>
      <Heading
        title="Cập nhật Danh mục"
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
      {state.activeCategory && (
        <CategoryForm type="update" isFormLoading={getCategoryByIdLoading ?? true} formikRef={formikRef} category={state.activeCategory} />
      )}
    </>
  );
};

export default UpdateCategory;
