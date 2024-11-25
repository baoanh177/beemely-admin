import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IStatsInitialState } from "@/services/store/stats/stats.slice";
import { getOrderStatusCount } from "@/services/store/stats/stats.thunk";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsTruck, BsBox, BsMailbox, BsHouseCheck } from "react-icons/bs";
import { HiArrowPathRoundedSquare, HiMiniArrowUturnLeft } from "react-icons/hi2";
import { IoBanOutline } from "react-icons/io5";
import { RiProgress2Line } from "react-icons/ri";
import { TfiTruck } from "react-icons/tfi";
import { TResponseOrderStatusCount } from "@/services/store/stats/stat.model";
import { IconType } from "react-icons";
import { EStatusOrder } from "@/services/store/order/order.model";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Card } from "antd";

const statusConfig: Record<keyof TResponseOrderStatusCount, { label: string; icon: IconType }> = {
  pending: {
    label: "Chờ xử lý",
    icon: RiProgress2Line,
  },
  processing: {
    label: "Đang xử lý",
    icon: BsBox,
  },
  delivering: {
    label: "Đang giao",
    icon: BsTruck,
  },
  delivered: {
    label: "Đã giao",
    icon: BsMailbox,
  },
  success: {
    label: "Hoàn thành",
    icon: BsHouseCheck,
  },
  cancelled: {
    label: "Đã hủy",
    icon: IoBanOutline,
  },
  request_return: {
    label: "Yêu cầu trả hàng",
    icon: HiArrowPathRoundedSquare,
  },
  denied_return: {
    label: "Từ chối trả hàng",
    icon: AiOutlineCloseCircle,
  },
  returning: {
    label: "Đang trả hàng",
    icon: HiMiniArrowUturnLeft,
  },
  returned: {
    label: "Đã trả hàng",
    icon: TfiTruck,
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
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-5">
      {Object.entries(state.orderCount || {}).map(([status, count]) => {
        const statusKey = status as EStatusOrder;
        const config = statusConfig[statusKey];
        const Icon = config.icon;

        return (
          <Card key={status}>
            <Link to={`/orders`} className="flex flex-col items-center hover:text-primary-700">
              <Icon className={"h-6 w-6"} />
              <div className="mt-2 text-center">
                <h3 className={clsx("text-4xl font-bold text-primary-600")}>{count}</h3>
                <p className={clsx("text-sm font-medium")}>{config.label}</p>
              </div>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

export default OrderStatusCount;
