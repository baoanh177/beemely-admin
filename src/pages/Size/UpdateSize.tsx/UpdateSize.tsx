import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ISizeInitialState, resetStatus } from "@/services/store/size/size.slice";
import { getAllSizes, getSizeById } from "@/services/store/size/size.thunk";
import { EFetchStatus } from "@/shared/enums/status";
import { FormikProps } from "formik";
import { useEffect, useMemo, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import SizeForm, { ISizeFormInitialValues } from "../SizeForm";
import { getAllCategories } from "@/services/store/category/category.thunk";
import { ICategoryInitialState } from "@/services/store/category/category.slice";

const UpdateSize = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<ISizeFormInitialValues>>(null);
  const { id } = useParams();
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

  const { getSizeByIdLoading } = useAsyncEffect((async) => id && async(dispatch(getSizeById({ param: id })), "getSizeByIdLoading"), [id]);

  useEffect(() => {
    dispatch(getAllSizes({}));
    dispatch(getAllCategories({}));
  }, [dispatch]);

  useEffect(() => {
    if (state.activeSize) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeSize.name,
          gender: state.activeSize.gender.id,
        });
      }
    }
  }, [state.activeSize]);

  const categoryOptions = useMemo(() => {
    const options = categoryState.categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));

    return options;
  }, [state.categories]);

  return (
    <>
      <Heading
        title="Cập nhật Kích cỡ"
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
      {state.activeSize && (
        <SizeForm
          type="update"
          isFormLoading={getSizeByIdLoading ?? true}
          formikRef={formikRef}
          size={state.activeSize}
          categories={categoryOptions}
        />
      )}
    </>
  );
};

export default UpdateSize;
