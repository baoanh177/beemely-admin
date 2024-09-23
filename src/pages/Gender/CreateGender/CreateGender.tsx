import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import GenderForm, { IGenderFormInitialValues } from "../GenderForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import { IGenderInitialState, resetStatus } from "@/services/store/gender/gender.slice";
import { EFetchStatus } from "@/shared/enums/status";

const CreateGender = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IGenderFormInitialValues>>(null);
  const { state } = useArchive<IGenderInitialState>("gender");

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
              navigate("/genders");
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
      <GenderForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateGender;
