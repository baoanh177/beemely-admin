import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IUserGenderInitialState, setFilter, resetStatus } from "@/services/store/userGender/userGender.slice";
import { deleteUserGender, getAllUserGenders } from "@/services/store/userGender/userGender.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserGenders = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IUserGenderInitialState>("userGender");

  useFetchStatus({
    module: "userGender",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllUserGendersLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllUserGenders({ query: state.filter })), "getAllUserGendersLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType<ITableData> = [
    {
      dataIndex: "name",
      title: "Tên",
    },
    {
      dataIndex: "description",
      title: "Mô tả",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.userGenders && state.userGenders.length > 0) {
      return state.userGenders.map((userGender) => ({
        key: userGender.id,
        name: userGender.name,
        description: userGender.description,
      }));
    }
    return [];
  }, [state.userGenders]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/userGenders/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_USER_GENDER,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteUserGender(record.key));
      },
      permission: EPermissions.DELETE_USER_GENDER,
    },
  ];

  return (
    <>
      <Heading
        title="Giới tính người dùng"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_USER_GENDER,
            text: "Tạo mới Giới tính người dùng",
            onClick: () => navigate("/userGenders/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllUserGendersLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._size!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={{
          input: {
            placeholder: "Nhập tên giới tính người dùng...",
            onChange(value) {
              dispatch(setFilter({ ...state.filter, name: value }));
            },
          },
        }}
      />
    </>
  );
};

export default UserGenders;
