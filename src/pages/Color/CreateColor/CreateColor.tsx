import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ColorForm, { IColorFormInitialValues } from "../ColorForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import { IColorInitialState, resetStatus } from "@/services/store/color/color.slice";
import { EFetchStatus } from "@/shared/enums/status";

const CreateColor = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IColorFormInitialValues>>(null);
  const { state } = useArchive<IColorInitialState>("color");

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

  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Heading
        title="Tạo mới Mã màu"
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
            text: "Tạo mới Mã màu",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <ColorForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateColor;
