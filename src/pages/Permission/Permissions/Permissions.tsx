import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import { IPermissionInitialState, setFilter } from "@/services/store/permission/permission.slice";
import { getAllPermissions } from "@/services/store/permission/permission.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo } from "react";
import { EPermissions } from "@/shared/enums/permissions";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Permissions = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useArchive<IPermissionInitialState>("permission");

  const columns: ColumnsType = [
    {
      dataIndex: "label",
      title: "Label",
    },
    {
      dataIndex: "value",
      title: "Value",
    },
    {
      dataIndex: "module",
      title: "Module",
      sorter: true,
    },
  ];

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      permission: EPermissions.UPDATE_PERMISSION,
      onClick() {},
    },
    {
      type: EButtonTypes.DELETE,
      permission: EPermissions.DELETE_PERMISSION,
      onClick() {},
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.permissions && state.permissions.length > 0) {
      return state.permissions.map((permission) => ({
        key: permission.id,
        label: permission.label,
        value: permission.name,
        module: permission.module,
      }));
    }
    return [];
  }, [JSON.stringify(state.permissions)]);

  useEffect(() => {
    dispatch(
      getAllPermissions({
        query: state.filter,
      }),
    );
  }, [state.filter]);

  return (
    <>
      <Heading
        title="Permissions"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_PERMISSION,
            text: "Create Permission",
            onClick: () => navigate("/permissions/create"),
          },
        ]}
      />
      <ManagementGrid columns={columns} data={data} search={{ status: [] }} setFilter={setFilter} buttons={buttons} />
    </>
  );
};

export default Permissions;
