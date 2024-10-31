import Heading from "@/components/layout/Heading";
import { format } from "date-fns";
import { GoDownload } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { EPermissions } from "@/shared/enums/permissions";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IOrderInitialState, resetStatus, setFilter } from "@/services/store/order/order.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getAllOrder } from "@/services/store/order/order.thunk";
import { ITableData } from "@/components/table/PrimaryTable";
import { useMemo } from "react";
import ManagementGrid from "@/components/grid/ManagementGrid";
import { IoSearchOutline } from "react-icons/io5";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { getGridButtons, tableColumns } from "../utils/dataTable";
import { useNavigate } from "react-router-dom";

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

  const defaultSearch: IDefaultSearchProps = {
    filterOptions: {
      name: "status",
      options: [
        { label: "Đã hoàn thành", value: "success" },
        { label: "Đang chờ", value: "pending" },
        { label: "Đang tiến hành", value: "processing" },
        { label: "Thất bại", value: "cancelled" },
        { label: "Đang giao hàng", value: "shipped" },
        { label: "Giao thành công", value: "delivered" },
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
      onChange: (value) => {
        dispatch(setFilter({ ...state.filter, order_id: value }));
      },
      placeholder: "Tìm kiếm theo tên. . .",
    },
  };

  const data: ITableData[] = useMemo(() => {
    return (
      state.orders?.map((order) => {
        const formattedDate = format(new Date(order.createdAt), "dd/MM/yyyy, hh:mm a");

        return {
          key: order.id,
          orderStatus: order.orderStatus,
          paymentType: order.paymentType,
          paymentStatus: order.paymentStatus,
          totalPrice: order.totalPrice,
          shippingAddress: order.shippingAddress,
          createdAt: formattedDate,
          user: order.user,
        };
      }) || []
    );
  }, [state.orders]);

  const navigate = useNavigate();
  // const a = "";
  const buttons = getGridButtons(dispatch, navigate);
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
      <ManagementGrid
        isTableLoading={getAllOrderLoading}
        columns={tableColumns}
        data={data}
        search={defaultSearch}
        setFilter={setFilter}
        buttons={buttons}
        pagination={{ current: state.filter._page ?? 1, pageSize: state.filter._limit ?? 10, total: state.totalRecords }}
      />
    </>
  );
};

export default Orders;
