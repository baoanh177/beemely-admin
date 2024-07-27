import Heading from "@/components/layout/Heading";
import PermissionForm, { IPermissionFormInitialValues } from "../PermissionForm";
import { useArchive } from "@/hooks/useArchive";
import { IPermissionInitialState, resetStatus } from "@/services/store/permission/permission.slice";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { FormikProps } from "formik";
import useFetchStatus from "@/hooks/useFetchStatus";
import { getPermissionById } from "@/services/store/permission/permission.thunk";
import useAsyncEffect from "@/hooks/useAsyncEffect";

const UpdatePermission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IPermissionInitialState>("permission");

  const formikRef = useRef<FormikProps<IPermissionFormInitialValues>>(null);

  useFetchStatus({
    module: "permission",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/permissions",
      },
      error: {
        message: state.message,
      },
    },
  });

  const {
    loading: { getPermissionByIdLoading },
  } = useAsyncEffect((async) => {
    id && async(dispatch(getPermissionById(id)), "getPermissionByIdLoading");
  }, []);

  return (
    <>
      <Heading
        title="Cập nhật Quyền"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/permissions");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Lưu thay đổi",
            icon: <IoSaveOutline className="text-[18px]" />,
            onClick: () => {
              formikRef && formikRef.current && formikRef.current.handleSubmit();
            },
          },
        ]}
      />
      <PermissionForm formikRef={formikRef} isFormLoading={getPermissionByIdLoading ?? true} type="update" permission={state.activePermission} />
    </>
  );
};

export default UpdatePermission;
