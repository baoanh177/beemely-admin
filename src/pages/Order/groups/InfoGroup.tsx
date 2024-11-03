import StatusBadge from "@/components/common/StatusBadge";
import FormGroup from "@/components/form/FormGroup";
import { format } from "date-fns";

const InfoGroup = ({ order }: any) => {
  const formattedDate = format(new Date(order.createdAt), "dd/MM/yyyy, hh:mm a");
  return (
    <FormGroup className="bg-red-40" title={`Order Details: #${order.uniqueId}`}>
      <div className="mt-[-0.5rem] flex flex-col gap-6">
        <div className="font-[13.3px] text-[#5e6e82]">{formattedDate}</div>
        <div className="flex flex-row gap-4">
          <span className="tracking-wide">Status: </span>
          {order.orderStatus === "pending" ? (
            <StatusBadge text={"Đang chờ"} color="yellow" />
          ) : order.orderStatus === "success" ? (
            <StatusBadge text={"Đã hoàn thành"} color="green-capital" />
          ) : order.orderStatus === "cancelled" ? (
            <StatusBadge text={"Đã hủy"} color="red" />
          ) : order.orderStatus === "processing" ? (
            <StatusBadge text={" Đang tiến hành"} color="red" />
          ) : order.orderStatus === "shipped" ? (
            <StatusBadge text={"Đang giao hàng"} color="red" />
          ) : (
            <StatusBadge text={" Đã giao thành công"} color="red" />
          )}{" "}
        </div>
      </div>
    </FormGroup>
  );
};

export default InfoGroup;
