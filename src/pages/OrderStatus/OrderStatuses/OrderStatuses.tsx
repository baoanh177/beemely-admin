import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IOrderStatusInitialState, setFilter, resetStatus } from "@/services/store/orderStatus/orderStatus.slice";
import { deleteOrderStatus, getAllOrderStatuses } from "@/services/store/orderStatus/orderStatus.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const OrderStatuses = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IOrderStatusInitialState>("orderStatus");
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
    module: "orderStatus",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllOrderStatusesLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllOrderStatuses({ query: state.filter })), "getAllOrderStatusesLoading"),
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
    if (state.orderStatuses && state.orderStatuses.length > 0) {
      return state.orderStatuses.map((orderStatus) => ({
        key: orderStatus.id,
        name: orderStatus.name,
        description: orderStatus.description,
      }));
    }
    return [];
  }, [state.orderStatuses]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/order-statuses/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_ORDER_STATUS,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteOrderStatus({ param: record.key }));
      },
      permission: EPermissions.DELETE_ORDER_STATUS,
    },
  ];

  return (
    <>
      <Heading
        title="Trạng thái đơn hàng"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_ORDER_STATUS,
            text: "Tạo mới Trạng thái đơn hàng",
            onClick: () => navigate("/order-statuses/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllOrderStatusesLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={defaultSearch}
      />
    </>
  );
};

export default OrderStatuses;
