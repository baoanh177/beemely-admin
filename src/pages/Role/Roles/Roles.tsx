import ManagementGrid from "@/components/grid/ManagementGrid";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import Heading from "@/layouts/Default/Heading";
import { RootStateType } from "@/services/reducers";
import { IRoleInitialState } from "@/services/store/role/role.slice";
import { getAllRoles } from "@/services/store/role/role.thunk";
import { ButtonTypes } from "@/shared/enums/button";
import { Permissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IRoleInitialState>("role");

  const buttons: IGridButton[] = [
    {
      type: ButtonTypes.VIEW,
      onClick() {},
      permission: Permissions.READ_ROLE,
    },
    {
      type: ButtonTypes.UPDATE,
      onClick() {},
      permission: Permissions.UPDATE_ROLE,
    },
    {
      type: ButtonTypes.DELETE,
      onClick() {},
      permission: Permissions.DELETE_ROLE,
    },
  ];

  const columns: ColumnsType = [
    {
      dataIndex: "name",
      title: "Name",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.roles && state.roles.length > 0) {
      return state.roles.map((role) => ({
        key: role.id,
        name: role.name,
      }));
    }
    return [];
  }, [JSON.stringify(state.roles)]);

  useEffect(() => {
    dispatch(getAllRoles());
  }, []);

  return (
    <>
      <Heading
        title="Roles"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: Permissions.CREATE_ROLE,
            text: "Create Role",
            onClick: () => navigate("/roles/create"),
          },
        ]}
      />
      <ManagementGrid columns={columns} data={data} search={false} buttons={buttons} />
    </>
  );
};

export default Roles;
