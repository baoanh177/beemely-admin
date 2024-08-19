import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import { IPermissionInitialState, resetStatus, setFilter } from "@/services/store/permission/permission.slice";
import { deletePermission, getAllPermissions } from "@/services/store/permission/permission.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { EPermissions } from "@/shared/enums/permissions";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useFetchStatus from "@/hooks/useFetchStatus";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";

export const defaultSearch: IDefaultSearchProps = {
  input: {
    type: "text",
    name: "123",
    placeholder: "Search ordersss. . .",
  },
};
const Permissions = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IPermissionInitialState>("permission");
  const columns: ColumnsType = [
    {
      dataIndex: "label",
      title: "Label",
    },
    {
      dataIndex: "value",
      title: "Giá trị",
    },
    {
      dataIndex: "module",
      title: "Module",
    },
  ];

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      permission: EPermissions.UPDATE_PERMISSION,
      onClick(record) {
        navigate(`/permissions/update/${record.key}`);
      },
    },
    {
      type: EButtonTypes.DELETE,
      permission: EPermissions.DELETE_PERMISSION,
      onClick(record) {
        dispatch(deletePermission({ param: record.key }));
      },
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

  useFetchStatus({
    module: "permission",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getAllPermissionsLoading } = useAsyncEffect(
    (async) => {
      async(
        dispatch(
          getAllPermissions({
            query: state.filter,
          }),
        ),
        "getAllPermissionsLoading",
      );
    },
    [state.filter],
  );

  return (
    <>
      <Heading
        title="Quyền"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_PERMISSION,
            text: "Tạo mới Quyền",
            onClick: () => navigate("/permissions/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllPermissionsLoading}
        search={defaultSearch}
        pagination={{
          current: state.filter._page!,
          pageSize: state.filter._limit!,
          total: state.totalRecords,
        }}
        setFilter={setFilter}
        buttons={buttons}
      />
    </>
  );
};

export default Permissions;
