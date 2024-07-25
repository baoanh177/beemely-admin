import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ILabelInitialState, resetStatus } from "@/services/store/label/label.slice";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { FormikProps } from "formik";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LabelForm, { ILabelFormInitialValues } from "../LabelForm";

const CreateLabel = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<ILabelFormInitialValues>>(null);

  const { state } = useArchive<ILabelInitialState>("label");

  useFetchStatus({
    module: "label",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/labels",
      },
      error: {
        message: state.message,
      },
    },
  });

  return (
    <>
      <Heading
        title="Tạo mới Nhãn"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/labels");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Tạo mới Nhãn",
            icon: <FaPlus className="text-[18px]" />,
            onClick: () => {
              if (formikRef.current) {
                formikRef.current.handleSubmit();
              }
            },
          },
        ]}
      />
      <LabelForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateLabel;
