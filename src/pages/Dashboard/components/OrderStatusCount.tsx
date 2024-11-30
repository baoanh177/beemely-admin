import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IStatsInitialState } from "@/services/store/stats/stats.slice";
import { getOrderStatusCount } from "@/services/store/stats/stats.thunk";
import { TResponseOrderStatusCount } from "@/services/store/stats/stat.model";
import { EStatusOrder } from "@/services/store/order/order.model";
import clsx from "clsx";
import { Link } from "react-router-dom";

const statusConfig: Record<keyof TResponseOrderStatusCount, { label: string }> = {
  pending: {
    label: "Chờ xử lý",
  },
  processing: {
    label: "Đang xử lý",
  },
  delivering: {
    label: "Đang giao",
  },
  delivered: {
    label: "Đã giao",
  },
  compensating: {
    label: "Đang giao bù hàng",
  },
  compensated: {
    label: "Đã giao bù hàng",
  },
  success: {
    label: "Hoàn thành",
  },
  cancelled: {
    label: "Đã hủy",
  },
  request_return: {
    label: "Yêu cầu trả hàng",
  },
  denied_return: {
    label: "Từ chối trả hàng",
  },
  returning: {
    label: "Đang trả hàng",
  },
  returned: {
    label: "Đã trả hàng",
  },
};

const OrderStatusCount = () => {
  const { state, dispatch } = useArchive<IStatsInitialState>("stats");

  const { getOrderStatusCountLoading } = useAsyncEffect((async) => async(dispatch(getOrderStatusCount({})), "getOrderStatusCountLoading"), []);
  if (getOrderStatusCountLoading)
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Đang tải...</p>
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-6">
      {Object.entries(state.orderCount || {}).map(([status, count]) => {
        const statusKey = status as EStatusOrder;
        const config = statusConfig[statusKey];

        return (
          <Link
            to={`/orders`}
            key={status}
            className={clsx(
              "flex flex-col items-center justify-center rounded-lg border border-primary-50 bg-white p-4 shadow-md transition-transform hover:scale-105",
            )}
          >
            <div className="mt-2 text-center">
              <h3 className={clsx("text-4xl font-bold text-primary-600")}>{count}</h3>
              <p className={clsx("text-base font-medium")}>{config.label}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default OrderStatusCount;
