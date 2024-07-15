import ManagementGrid from "@/components/grid/ManagementGrid";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import Heading from "@/components/layout/Heading";
import { IRoleInitialState, resetStatus, setFilter } from "@/services/store/role/role.slice";
import { deleteRole, getAllRoles } from "@/services/store/role/role.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IRoleInitialState>("role");
  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.VIEW,
      onClick(record) {
        navigate(`/roles/detail/${record?.key}`);
      },
      permission: EPermissions.READ_ROLE,
    },
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/roles/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_ROLE,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteRole(record?.key));
      },
      permission: EPermissions.DELETE_ROLE,
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

  useFetchStatus({
    module: "role",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  useEffect(() => {
    dispatch(getAllRoles({ query: state.filter }));
  }, [JSON.stringify(state.filter)]);

  return (
    <>
      <Heading
        title="Roles"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_ROLE,
            text: "Create Role",
            onClick: () => navigate("/roles/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        search={{ status: [] }}
        buttons={buttons}
        pagination={{
          current: state.filter.page ?? 1,
          pageSize: state.filter.size ?? 10,
          total: state.totalRecords,
        }}
        setFilter={setFilter}
      />
    </>
  );
};

export default Roles;
