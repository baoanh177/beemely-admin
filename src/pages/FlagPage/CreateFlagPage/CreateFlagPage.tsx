import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import FlagPageForm, { IFlagPageFormInitialValues } from "../FlagPageForm";
import { IFlagPageInitialState, resetStatus } from "@/services/store/flagPage/flagPage.slice";

const CreateFlagPage = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IFlagPageFormInitialValues>>(null);
  const { state } = useArchive<IFlagPageInitialState>("flagPage");

  useFetchStatus({
    module: "flagPage",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/flag-pages",
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
        title="Tạo mới Trang quản lý hiển thị"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/flag-pages");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Tạo mới Trang quản lý hiển thị",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <FlagPageForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateFlagPage;
