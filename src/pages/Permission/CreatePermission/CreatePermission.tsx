import Heading from "@/components/layout/Heading";
import PermissionForm, { IPermissionFormInitialValues } from "../PermissionForm";
import { useRef } from "react";
import { FormikProps } from "formik";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { useNavigate } from "react-router-dom";
import { useArchive } from "@/hooks/useArchive";
import { IPermissionInitialState, resetStatus } from "@/services/store/permission/permission.slice";
import useFetchStatus from "@/hooks/useFetchStatus";

const CreatePermission = () => {
  const formikRef = useRef<FormikProps<IPermissionFormInitialValues>>(null);

  const navigate = useNavigate()

  const { state } = useArchive<IPermissionInitialState>("permission")

  useFetchStatus({ module: "permission", reset: resetStatus, actions: {
    success: {
      message: "Created successfully",
      navigate: "/permissions"
    },
    error: {
      message: state.message
    }
  }})

  return (
    <>
      <Heading
        title="Create Permission"
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
            text: "Create Permission",
            icon: <FaPlus className="text-[18px]" />,
            onClick: () => {
              formikRef && formikRef.current && formikRef.current.handleSubmit();
            },
          },
        ]}
      />
      <PermissionForm type="create" formikRef={formikRef}/>
    </>
  );
};

export default CreatePermission;
