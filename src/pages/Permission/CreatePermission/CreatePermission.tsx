import Heading from "@/components/layout/Heading";
import PermissionForm, { IPermissionFormInitialValues } from "../PermissionForm";
import { useRef } from "react";
import { FormikProps } from "formik";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { EFetchStatus } from "@/shared/enums/status";
import { useNavigate } from "react-router-dom";
import { useArchive } from "@/hooks/useArchive";
import { IPermissionInitialState, resetStatus } from "@/services/store/permission/permission.slice";
import useFetchStatus from "@/hooks/useFetchStatus";

const CreatePermission = () => {
  const formikRef = useRef<FormikProps<IPermissionFormInitialValues>>(null);

  const navigate = useNavigate();

  const { state } = useArchive<IPermissionInitialState>("permission");

  useFetchStatus({
    module: "permission",
    reset: resetStatus,
    actions: {
      success: {
        message: "Tạo mới thành công",
        navigate: "/permissions",
      },
      error: {
        message: state.message,
      },
    },
  });

  return (
    <>
      <Heading
        title="Tạo mới Quyền"
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
            text: "Tạo mới Quyền",
            icon: <FaPlus className="text-[18px]" />,
            onClick: () => {
              formikRef && formikRef.current && formikRef.current.handleSubmit();
            },
          },
        ]}
      />
      <PermissionForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreatePermission;
