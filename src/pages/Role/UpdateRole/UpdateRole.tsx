import { useArchive } from "@/hooks/useArchive";
import Heading from "@/components/layout/Heading";
import { IRoleInitialState, resetStatus } from "@/services/store/role/role.slice";
import { getRoleById } from "@/services/store/role/role.thunk";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoleForm, { IRoleFormInitialValues } from "../RoleForm";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { FormikProps } from "formik";
import useFetchStatus from "@/hooks/useFetchStatus";
import { convertRolePermissions } from "../helpers/convertRolePermissions";

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

  useEffect(() => {
    if (id) dispatch(getRoleById(id));
  }, [id]);

  return (
    <>
      <Heading
        title="Update Role"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Cancel",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/roles");
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
      {state.activeRole && <RoleForm type="update" formikRef={formikRef} role={convertRolePermissions(state.activeRole)} />}
    </>
  );
};

export default UpdateRole;
