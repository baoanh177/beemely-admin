import Heading from "@/components/layout/Heading";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import RoleForm from "../RoleForm";
import { IRoleInitialState } from "@/services/store/role/role.slice";
import { useArchive } from "@/hooks/useArchive";
import { convertRolePermissions } from "../helpers/convertRolePermissions";
import { getRoleById } from "@/services/store/role/role.thunk";
import useAsyncEffect from "@/hooks/useAsyncEffect";

const DetailRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IRoleInitialState>("role");

  const {
    loading: { getRoleByIdLoading },
  } = useAsyncEffect(
    (async) => {
      if (id) async(dispatch(getRoleById(id)), "getRoleByIdLoading");
    },
    [id],
  );

  return (
    <>
      <Heading
        title="Chi tiết Vai trò"
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
        ]}
      />

      {state.activeRole && <RoleForm type="view" isFormLoading={getRoleByIdLoading ?? true} role={convertRolePermissions(state.activeRole)} />}
    </>
  );
};

export default DetailRole;
