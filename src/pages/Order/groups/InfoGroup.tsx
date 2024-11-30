import FormGroup from "@/components/form/FormGroup";
import { format } from "date-fns";
import OrderStatusBadge from "./OrderStatusBadge";

const InfoGroup = ({ order }: any) => {
  const formattedDate = format(new Date(order.createdAt), "dd/MM/yyyy, hh:mm a");
  return (
    <FormGroup className="relative" title={`Chi tiết đơn hàng: #${order.uniqueId}`}>
      <div
        className="absolute inset-y-0 bottom-0 right-0 top-0 w-1/2 bg-contain bg-right"
        style={{ backgroundImage: "url('/purple.svg')" }}
      ></div>
      <div className="z-10 mt-[-0.5rem] flex flex-col gap-6">
        <div className="font-[13.3px] text-[#5e6e82]">{formattedDate}</div>
        <div className="flex flex-row gap-4">
          <span className="tracking-wide">Trạng thái: </span>
          <OrderStatusBadge status={order.orderStatus} color={order.orderStatus} />
        </div>
      </div>
    </FormGroup>
  );
};

export default InfoGroup;
