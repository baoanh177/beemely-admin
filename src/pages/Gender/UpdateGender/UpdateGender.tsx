import { useRef, useEffect } from "react";
import { IoSaveOutline, IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import GenderForm, { IGenderFormInitialValues } from "../GenderForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import { IGenderInitialState, resetStatus } from "@/services/store/gender/gender.slice";
import { EFetchStatus } from "@/shared/enums/status";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getGenderById } from "@/services/store/gender/gender.thunk";

const UpdateGender = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IGenderFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IGenderInitialState>("gender");

  useFetchStatus({
    module: "gender",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/genders",
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getGenderByIdLoading } = useAsyncEffect((async) => id && async(dispatch(getGenderById({ param: id })), "getGenderByIdLoading"), [id]);

  useEffect(() => {
    if (state.activeGender) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeGender.name,
          imageUrl: state.activeGender.imageUrl,
          path: state.activeGender.path || `http://localhost:3000/gender/${state.activeGender?.slug}`,
        });
      }
    }
  }, [state.activeGender]);

  return (
    <>
      <Heading
        title="Cập nhật Giới tính"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/genders");
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
      {state.activeGender && (
        <GenderForm type="update" isFormLoading={getGenderByIdLoading ?? true} formikRef={formikRef} gender={state.activeGender} />
      )}
    </>
  );
};

export default UpdateGender;
