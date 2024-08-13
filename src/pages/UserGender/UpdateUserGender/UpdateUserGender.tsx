import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import UserGenderForm, { IUserGenderFormInitialValues } from "../UserGenderForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import { getUserGenderById } from "@/services/store/userGender/userGender.thunk";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IUserGenderInitialState, resetStatus } from "@/services/store/userGender/userGender.slice";
import { EFetchStatus } from "@/shared/enums/status";

const UpdateUserGender = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IUserGenderFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IUserGenderInitialState>("userGender");
  useFetchStatus({
    module: "userGender",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/user-genders",
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getUserGenderByIdLoading } = useAsyncEffect((async) => id && async(dispatch(getUserGenderById(id)), "getUserGenderByIdLoading"), [id]);

  useEffect(() => {
    if (state.activeUserGender) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeUserGender.name,
          description: state.activeUserGender.description,
        });
      }
    }
  }, [state.activeUserGender]);

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
              navigate("/user-genders");
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
      {state.activeUserGender && (
        <UserGenderForm
          type="update"
          isFormLoading={getUserGenderByIdLoading ?? true}
          formikRef={formikRef}
          userGender={state.activeUserGender}
        />
      )}
    </>
  );
};

export default UpdateUserGender;
