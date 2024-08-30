import { useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import FlagPageForm, { IFlagPageFormInitialValues } from "../FlagPageForm";
import { IFlagPageInitialState, resetStatus } from "@/services/store/flagPage/flagPage.slice";
import { getFlagPageById } from "@/services/store/flagPage/flagPage.thunk";

const UpdateFlagPage = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IFlagPageFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IFlagPageInitialState>("flagPage");
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

  const { getFlagPageByIdLoading } = useAsyncEffect(
    (async) => id && async(dispatch(getFlagPageById({ param: id })), "getFlagPageByIdLoading"),
    [id],
  );

  return (
    <>
      <Heading
        title="Cập nhật Trang đánh dấu"
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
      {state.activeFlagPage && (
        <FlagPageForm type="update" isFormLoading={getFlagPageByIdLoading ?? true} formikRef={formikRef} flagPage={state.activeFlagPage} />
      )}
    </>
  );
};

export default UpdateFlagPage;
