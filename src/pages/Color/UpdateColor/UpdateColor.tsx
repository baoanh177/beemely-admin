import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import ColorForm, { IColorFormInitialValues } from "../ColorForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import { getColorById } from "@/services/store/color/color.thunk";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IColorInitialState, resetStatus } from "@/services/store/color/color.slice";
import { EFetchStatus } from "@/shared/enums/status";

const UpdateColor = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IColorFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IColorInitialState>("color");
  useFetchStatus({
    module: "color",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/colors",
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getColorByIdLoading } = useAsyncEffect((async) => id && async(dispatch(getColorById(id)), "getColorByIdLoading"), [id]);

  useEffect(() => {
    if (state.activeColor) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeColor.name,
          value: state.activeColor.value,
        });
      }
    }
  }, [state.activeColor]);

  return (
    <>
      <Heading
        title="Cập nhật Mã màu"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/colors");
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
      {state.activeColor && (
        <ColorForm type="update" isFormLoading={getColorByIdLoading ?? true} formikRef={formikRef} color={state.activeColor} />
      )}
    </>
  );
};

export default UpdateColor;
