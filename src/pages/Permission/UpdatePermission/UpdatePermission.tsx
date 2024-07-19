import Heading from "@/components/layout/Heading";
import PermissionForm, { IPermissionFormInitialValues } from "../PermissionForm";
import { useArchive } from "@/hooks/useArchive";
import { IPermissionInitialState, resetStatus } from "@/services/store/permission/permission.slice";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { FormikProps } from "formik";
import useFetchStatus from "@/hooks/useFetchStatus";
import { getPermissionById } from "@/services/store/permission/permission.thunk";

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

  useEffect(() => {
    dispatch(getPermissionById(id as string));
  }, [])

  return (
    <>
      <Heading
        title="Update Permission"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Cancel",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/permissions");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Save Change",
            icon: <IoSaveOutline className="text-[18px]" />,
            onClick: () => {
              formikRef && formikRef.current && formikRef.current.handleSubmit();
            },
          },
        ]}
      />
      <PermissionForm formikRef={formikRef} type="update" permission={state.activePermission}/>
    </>
  );
};

export default UpdatePermission;
