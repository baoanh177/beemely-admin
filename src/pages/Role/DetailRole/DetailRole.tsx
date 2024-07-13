import Heading from "@/components/layout/Heading";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import RoleForm from "../RoleForm";
import { IRoleInitialState } from "@/services/store/role/role.slice";
import { useArchive } from "@/hooks/useArchive";
import { convertRolePermissions } from "../helpers/convertRolePermissions";
import { getRoleById } from "@/services/store/role/role.thunk";
import { useEffect } from "react";

const DetailRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IRoleInitialState>("role");

  useEffect(() => {
    if (id) dispatch(getRoleById(id));
  }, [id]);

  return (
    <>
      <Heading
        title="Detail Role"
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
        ]}
      />

      {state.activeRole && <RoleForm type="view" role={convertRolePermissions(state.activeRole)} />}
    </>
  );
};

export default DetailRole;
