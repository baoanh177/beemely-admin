import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import UserGenderForm, { IUserGenderFormInitialValues } from "../UserGenderForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import { IUserGenderInitialState, resetStatus } from "@/services/store/userGender/userGender.slice";
import { EFetchStatus } from "@/shared/enums/status";

const CreateUserGender = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IUserGenderFormInitialValues>>(null);
  const { state } = useArchive<IUserGenderInitialState>("userGender");

  useFetchStatus({
    module: "userGender",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/userGenders",
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
        title="Tạo mới Giới tính"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/userGenders");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Tạo mới Giới tính",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <UserGenderForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateUserGender;
