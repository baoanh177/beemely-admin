import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IShippingMethodInitialState, resetStatus, setFilter } from "@/services/store/shippingMethod/shippingMethod.slice";
import { deleteShippingMethod, getAllShippingMethod } from "@/services/store/shippingMethod/shippingMethod.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ShippingMethod = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IShippingMethodInitialState>("shippingMethod");
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
    module: "shippingMethod",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllShippingMethodLoading } = useAsyncEffect(
    (async) => {
      async(dispatch(getAllShippingMethod({ query: state.filter })), "getAllShippingMethodLoading");
    },
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType<ITableData> = [
    {
      dataIndex: "name",
      title: "Tên",
    },
    {
      dataIndex: "cost",
      title: "Giá",
    },
    {
      dataIndex: "estimatedDeliveryTime",
      title: "Thời gian giao hàng ước tính",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (Array.isArray(state.shippingMethod)) {
      return state.shippingMethod
        .filter((item) => item.id)
        .map((item) => ({
          key: item.id ?? "default-key",
          name: item.name,
          cost: item.cost,
          estimatedDeliveryTime: item.estimatedDeliveryTime,
        }));
    }
    return [];
  }, [state.shippingMethod]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/shipping-methods/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_ShIPPING_METHOD,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteShippingMethod({ param: record.key }));
      },
      permission: EPermissions.DELETE_SHIPPING_METHOD,
    },
  ];

  return (
    <>
      <Heading
        title="Danh sách Phương thức vận chuyển"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_SHIPPING_METHOD,
            text: "Tạo mới Phương thức vận chuyển",
            onClick: () => navigate("/shipping-methods/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns as ColumnsType<any>}
        data={data}
        isTableLoading={getAllShippingMethodLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={defaultSearch}
      />
    </>
  );
};

export default ShippingMethod;
