import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
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
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Colors = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IColorInitialState>("color");
  const defaultSearch: IDefaultSearchProps = {
    input: {
      type: "text",
      name: "name",
      icon: IoSearchOutline,
      onChange: (value) => {
        dispatch(setFilter({ ...state.filter, name: value }));
      },
      placeholder: "Tìm kiếm theo tên. . .",
    },
  };
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

  const columns: ColumnsType = [
    {
      key: "name",
      dataIndex: "name",
      title: "Tên",
    },
    {
      key: "value",
      dataIndex: "value",
      title: "Mã màu",
      render: (value) => (
        <div className="flex items-center">
          <ColorPicker value={value} />
          <span className="ml-2">{value}</span>
        </div>
      ),
    },
    {
      key: "productCount",
      dataIndex: "productCount",
      title: "Số lượng sản phẩm",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.colors && state.colors.length > 0) {
      return state.colors.map((color) => ({
        key: color.id,
        name: color.name,
        value: color.value,
        productCount: color.productCount,
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
        dispatch(deleteColor({ param: record.key }));
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
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={defaultSearch}
      />
    </>
  );
};

export default Colors;
