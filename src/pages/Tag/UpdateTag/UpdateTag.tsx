import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import TagForm, { ITagFormInitialValues } from "../TagForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ITagInitialState, resetStatus } from "@/services/store/tag/tag.slice";
import { useArchive } from "@/hooks/useArchive";
import { getTagById } from "@/services/store/tag/tag.thunk";
import useAsyncEffect from "@/hooks/useAsyncEffect";

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
  const { getTagByIdLoading } = useAsyncEffect((async) => id && async(dispatch(getTagById(id)), "getTagByIdLoading"), [id]);

  useEffect(() => {
    if (state.activeTag) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeTag.name,
          description: state.activeTag.description,
          slug: state.activeTag.slug,
          image: state.activeTag.image,
          status: state.activeTag.status,
          parentId: state.activeTag.parentId?.id,
        });
      }
    }
  }, [state.activeTag]);
  return (
    <>
      <Heading
        title="Cập nhật Thẻ"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/tags");
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
      {state.activeTag && <TagForm type="update" isFormLoading={getTagByIdLoading ?? true} formikRef={formikRef} tag={state.activeTag} />}
    </>
  );
};

export default UpdateTag;
