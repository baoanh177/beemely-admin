import StatusBadge from "@/components/common/StatusBadge";
import FormGroup from "@/components/form/FormGroup";
import { format } from "date-fns";

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
          {order.orderStatus === "pending" ? (
            <StatusBadge text={"Chờ xác nhận"} color="yellow" />
          ) : order.orderStatus === "success" ? (
            <StatusBadge text={"Đã hoàn thành"} color="green-capital" />
          ) : order.orderStatus === "cancelled" ? (
            <StatusBadge text={"Đã hủy"} color="red" />
          ) : order.orderStatus === "processing" ? (
            <StatusBadge text={" Đang chuẩn bị hàng"} color="blue" />
          ) : order.orderStatus === "shipped" ? (
            <StatusBadge text={"Đang giao hàng"} color="darkgreen" />
          ) : (
            <StatusBadge text={" Đã giao thành công"} color="green-capital" />
          )}{" "}
        </div>
      </div>
    </FormGroup>
  );
};

export default InfoGroup;
