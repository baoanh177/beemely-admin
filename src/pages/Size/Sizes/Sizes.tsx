import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ISizeInitialState, resetStatus, setFilter } from "@/services/store/size/size.slice";
import { deleteSize, getAllSizes } from "@/services/store/size/size.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sizes = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<ISizeInitialState>("size");

  useFetchStatus({
    module: "size",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllSizesLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllSizes({ query: state.filter })), "getAllSizesLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType<ITableData> = [
    {
      dataIndex: "name",
      title: "Tên",
    },
    {
      dataIndex: "gender",
      title: "Giới tính",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.sizes && state.sizes.length > 0) {
      return state.sizes.map((size) => ({
        key: size.id,
        name: size.name,
        gender: size.gender.name,
      }));
    }

    return [];
  }, [state.sizes]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/sizes/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_SIZE,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteSize(record.key));
      },
      permission: EPermissions.DELETE_SIZE,
    },
  ];

  return (
    <>
      <Heading
        title="Kích cỡ"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_SIZE,
            text: "Tạo mới Kích cỡ",
            onClick: () => navigate("/sizes/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllSizesLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._size!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={{
          input: {
            placeholder: "Nhập tên kích cỡ...",
            onChange(value) {
              dispatch(setFilter({ ...state.filter, name: value }));
            },
          },
        }}
      />
    </>
  );
};

export default Sizes;
