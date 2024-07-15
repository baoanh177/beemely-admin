import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import TagForm, { ITagFormInitialValues } from "../TagForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ITagInitialState, resetStatus } from "@/services/store/tag/tag.slice";
import { useArchive } from "@/hooks/useArchive";
import { getTagById } from "@/services/store/tag/tag.thunk";

const UpdateTag = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<ITagFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<ITagInitialState>("tag");

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

  useEffect(() => {
    if (id) {
      dispatch(getTagById(id));
    }
  }, [id]);

  useEffect(() => {
    if (state.activeTag) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeTag.name,
          description: state.activeTag.description,
        });
      }
    }
  }, [state.activeTag]);
  return (
    <>
      <Heading
        title="Update Tag"
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
            text: "Save change",
            icon: <IoSaveOutline className="text-[18px]" />,
            onClick: () => {
              if (formikRef.current) {
                formikRef.current.handleSubmit();
              }
            },
          },
        ]}
      />
      {state.activeTag && <TagForm type="update" formikRef={formikRef} tag={state.activeTag} />}
    </>
  );
};

export default UpdateTag;
