import { useEffect, useMemo, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SizeForm, { ISizeFormInitialValues } from "../SizeForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import { ISizeInitialState, resetStatus } from "@/services/store/size/size.slice";
import { EFetchStatus } from "@/shared/enums/status";
import { getAllCategories } from "@/services/store/category/category.thunk";
import { ICategoryInitialState } from "@/services/store/category/category.slice";

const CreateSize = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<ISizeFormInitialValues>>(null);
  const { state, dispatch } = useArchive<ISizeInitialState>("size");
  const { state: categoryState } = useArchive<ICategoryInitialState>("category");

  useFetchStatus({
    module: "size",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/sizes",
      },
      error: {
        message: state.message,
      },
    },
  });
  useEffect(() => {
    dispatch(getAllCategories({}));
  }, [dispatch]);
  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };
  const categoryOptions = useMemo(
    () =>
      categoryState.categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categoryState.categories],
  );
  return (
    <>
      <Heading
        title="Tạo mới Kích cỡ"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/sizes");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Tạo mới Kích cỡ",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <SizeForm type="create" categories={categoryOptions} formikRef={formikRef} />
    </>
  );
};

export default CreateSize;
