import FormGroup from "@/components/form/FormGroup";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IOrderInitialState } from "@/services/store/order/order.slice";
import { getOrderLogsByOrderId } from "@/services/store/order/order.thunk";
import { generateLogsMessage } from "@/utils/generateLogsMessage";
import { Avatar } from "antd";
import { Timeline } from "antd";
import { BsFillClockFill } from "react-icons/bs";

interface OrderLogsGroupProps {
  orderId: string;
}

const Skeleton: React.FC = () => (
  <div className="flex flex-col gap-4">
    <div className="h-14 w-full animate-pulse rounded-md bg-gray-100" />
    <div className="h-14 w-full animate-pulse rounded-md bg-gray-100" />
    <div className="h-14 w-full animate-pulse rounded-md bg-gray-100" />
  </div>
);
const OrderLogsGroup = ({ orderId }: OrderLogsGroupProps) => {
  const { state, dispatch } = useArchive<IOrderInitialState>("order");

  const { getOrderLogByOrderIdLoading } = useAsyncEffect(
    (async) => {
      orderId && async(dispatch(getOrderLogsByOrderId({ param: orderId })), "getOrderLogByOrderIdLoading");
    },
    [orderId],
  );
  if (getOrderLogByOrderIdLoading)
    return (
      <FormGroup className="flex flex-col space-y-3" title="">
        <Skeleton />
      </FormGroup>
    );

  const formatedLogsItems = state.logs.map((log) => ({
    dot: <BsFillClockFill color="#662E9B" size={18} />,

    children: (
      <div key={log.id}>
        <div className="flex items-center gap-2">
          <Avatar className="shrink-0" src={log.performedByUser.avatarUrl} size={33} />
          {generateLogsMessage(log)}
        </div>
      </div>
    ),
  }));

  return (
    <FormGroup className="flex flex-col space-y-3" title="">
      <h4 className="text-xl-semibold text-black-500">Lịch sử cập nhật đơn hàng</h4>
      <Timeline mode="left" items={formatedLogsItems} />
    </FormGroup>
  );
};

export default OrderLogsGroup;
