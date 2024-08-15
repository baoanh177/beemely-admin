import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IColorInitialState, setFilter, resetStatus } from "@/services/store/color/color.slice";
import { deleteColor, getAllColors } from "@/services/store/color/color.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColorPicker } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Colors = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IColorInitialState>("color");

  useFetchStatus({
    module: "color",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllColorsLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllColors({ query: state.filter })), "getAllColorsLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType<ITableData> = [
    {
      dataIndex: "name",
      title: "Tên",
    },
    {
      dataIndex: "value",
      title: "Mã màu",
      render: (value) => (
        <div className="flex items-center">
          <ColorPicker value={value} disabled />
          <span className="ml-2">{value}</span>
        </div>
      ),
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.colors && state.colors.length > 0) {
      return state.colors.map((color) => ({
        key: color.id,
        name: color.name,
        value: color.value,
      }));
    }
    return [];
  }, [state.colors]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/colors/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_COLOR,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteColor(record.key));
      },
      permission: EPermissions.DELETE_COLOR,
    },
  ];

  return (
    <>
      <Heading
        title="Mã màu"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_COLOR,
            text: "Tạo mới Mã màu",
            onClick: () => navigate("/colors/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllColorsLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._size!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={{
          input: {
            placeholder: "Nhập tên mã màu...",
            onChange(value) {
              dispatch(setFilter({ ...state.filter, name: value }));
            },
          },
        }}
      />
    </>
  );
};

export default Colors;
