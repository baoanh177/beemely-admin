import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IOrderInitialState, resetStatus, setFilter } from "@/services/store/order/order.slice";
import { getAllOrder } from "@/services/store/order/order.thunk";
import { EPermissions } from "@/shared/enums/permissions";
import { format } from "date-fns";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { getTableColumns } from "../utils/dataTable";
import "./index.css";

const Orders = () => {
  const { state, dispatch } = useArchive<IOrderInitialState>("order");
  useFetchStatus({
    module: "order",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllOrderLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllOrder({ query: { _pagination: false, ...state.filter } })), "getAllOrderLoading"),
    [JSON.stringify(state.filter)],
  );

  const defaultSearch: IDefaultSearchProps | any = {
    filterOptions: {
      name: "status",
      options: [
        { label: "Chờ xác nhận", value: "pending" },
        { label: "Đang chuẩn bị hàng", value: "processing" },
        { label: "Đang giao hàng", value: "delivering" },
        { label: "Giao thành công", value: "delivered" },
        { label: "Đã nhận hàng", value: "success" },
        { label: "Đã hủy", value: "cancelled" },
        { label: "Yêu cầu hoàn trả", value: "request_return" },
        { label: "Hủy yc hoàn trả", value: "denied_return" },
        { label: "Đang hoàn trả", value: "returning" },
      ],
      onChange: (selectedOption: any) => {
        const statusValue = selectedOption.value;
        dispatch(setFilter({ ...state.filter, order_status: statusValue }));
      },
    },
    input: {
      type: "text",
      name: "name",
      icon: IoSearchOutline,
      onChange: (value: any) => {
        dispatch(setFilter({ ...state.filter, order_id: value }));
      },
      placeholder: "Tìm kiếm theo tên. . .",
    },
  };
  const advancedSearch: any = [
    {
      type: "date",
      name: "parent_id",
      icon: IoSearchOutline,
      placeholder: "Tìm theo thời gian...",
      onChange: (dates: any) => {
        const [startDate, endDate] = dates;
        dispatch(setFilter({ ...state.filter, start_date: startDate.format("YYYY-MM-DD"), end_date: endDate.format("YYYY-MM-DD") }));
      },
    },
  ];

  const data: ITableData[] = useMemo(() => {
    return (
      state.orders?.map((order) => {
        const formattedDate = format(new Date(order.createdAt), "dd/MM/yyyy, hh:mm a");

        return {
          id: order.id,
          key: order.uniqueId,
          orderStatus: order.orderStatus,
          paymentType: order.paymentType,
          paymentStatus: order.paymentStatus,
          totalPrice: order.totalPrice,
          shippingAddress: order.shippingAddress,
          createdAt: formattedDate || "",
          user: order.user,
        };
      }) || []
    );
  }, [state]);

  const tableColumns = getTableColumns(dispatch);
  return (
    <>
      <Heading
        title="Đơn hàng"
        hasBreadcrumb
        buttons={[
          {
            text: "Xuất",
            type: "ghost",
            icon: <GoDownload className="text-[18px]" />,
            permission: EPermissions.READ_ORDER,
          },
          {
            text: "Tạo mới Đơn hàng",
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_ORDER,
          },
        ]}
      />
      <div className="tho-border">
        <ManagementGrid
          isTableLoading={getAllOrderLoading}
          columns={tableColumns}
          data={data}
          search={defaultSearch}
          advancedSearch={advancedSearch}
          setFilter={setFilter}
          buttons={[]}
          pagination={{ current: state.filter._page ?? 1, pageSize: state.filter._limit ?? 10, total: state.totalRecords }}
        />
      </div>
    </>
  );
};

export default Orders;
