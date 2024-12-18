import Heading from "@/components/layout/Heading";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import RoleForm, { IRoleFormInitialValues } from "../RoleForm";
import { FormikProps } from "formik";
import { useRef } from "react";
import { useArchive } from "@/hooks/useArchive";
import { IRoleInitialState, resetStatus } from "@/services/store/role/role.slice";
import useFetchStatus from "@/hooks/useFetchStatus";
import { EFetchStatus } from "@/shared/enums/status";

const CreateRole = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IRoleFormInitialValues>>(null);

  const { state } = useArchive<IRoleInitialState>("role");

  useFetchStatus({
    module: "role",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/roles",
      },
      error: {
        message: state.message,
      },
    },
  });

  return (
    <>
      <Heading
        title="Tạo mới Vai trò"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/roles");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Tạo mới Vai trò",
            icon: <FaPlus className="text-[18px]" />,
            onClick: () => {
              formikRef && formikRef.current && formikRef.current.handleSubmit();
            },
          },
        ]}
      />
      {/* @ts-ignore */}
      <RoleForm formikRef={formikRef} type="create" />
    </>
  );
};

export default CreateRole;
