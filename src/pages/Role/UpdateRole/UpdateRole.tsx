import { useArchive } from "@/hooks/useArchive";
import Heading from "@/components/layout/Heading";
import { IRoleInitialState, resetStatus } from "@/services/store/role/role.slice";
import { getRoleById } from "@/services/store/role/role.thunk";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoleForm, { IRoleFormInitialValues } from "../RoleForm";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { EFetchStatus } from "@/shared/enums/status";
import { FormikProps } from "formik";
import useFetchStatus from "@/hooks/useFetchStatus";
import { convertRolePermissions } from "../helpers/convertRolePermissions";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { CUSTOMER_NAME, SUPER_ADMIN_NAME } from "@/services/config/constants";

const UpdateRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IRoleInitialState>("role");
  const formikRef = useRef<FormikProps<IRoleFormInitialValues>>(null);

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

  const { getRoleByIdLoading } = useAsyncEffect((async) => id && async(dispatch(getRoleById({ param: id })), "getRoleByIdLoading"), [id]);

  useEffect(() => {
    if([SUPER_ADMIN_NAME, CUSTOMER_NAME].includes(state.activeRole?.name!)) return navigate('/roles')
    if (state.activeRole && formikRef.current) {
      formikRef.current.setValues(convertRolePermissions(state.activeRole));
    }
  }, [state.activeRole]);

  return (
    <>
      <Heading
        title="Cập nhật Vai trò"
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
            text: "Lưu thay đổi",
            icon: <IoSaveOutline className="text-[18px]" />,
            onClick: () => {
              formikRef && formikRef.current && formikRef.current.handleSubmit();
            },
          },
        ]}
      />
      {state.activeRole && (
        <RoleForm
          type="update"
          isFormLoading={getRoleByIdLoading ?? true}
          formikRef={formikRef}
          role={convertRolePermissions(state.activeRole)}
        />
      )}
    </>
  );
};

export default UpdateRole;
