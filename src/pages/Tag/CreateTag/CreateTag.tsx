import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import TagForm, { ITagFormInitialValues } from "../TagForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ITagInitialState, resetStatus } from "@/services/store/tag/tag.slice";
import { useArchive } from "@/hooks/useArchive";

const CreateTag = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<ITagFormInitialValues>>(null);

  const { state } = useArchive<ITagInitialState>("tag");

  useFetchStatus({
    module: "tag",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/tags",
      },
      error: {
        message: state.message,
      },
    },
  });

  return (
    <>
      <Heading
        title="Create Tag"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Cancel",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/tags");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Create Tag",
            icon: <FaPlus className="text-[18px]" />,
            onClick: () => {
              if (formikRef.current) {
                formikRef.current.handleSubmit();
              }
            },
          },
        ]}
      />
      <TagForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateTag;
