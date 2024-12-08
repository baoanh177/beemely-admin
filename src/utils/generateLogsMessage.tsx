import { EOrderLog, EStatusOrder, EWriteLogBy, IOrderLog } from "@/services/store/order/order.model";
import { format } from "date-fns";

const CONVERT_STATUS: Record<EStatusOrder, string> = {
  pending: "Chờ xác nhận",
  processing: "Đang chuẩn bị hàng",
  delivering: "Đang giao hàng",
  delivered: "Giao thành công",
  success: "Đã nhận hàng",
  cancelled: "Đã hủy",
  request_return: "Đang khiếu nại",
  returned: "Đã hoàn trả",
  returning: "Đang hoàn trả",
  compensated: "Đã giao bù",
  compensating: "Đang giao bù",
  denied_return: "Từ chối khiếu nại",
};

export const generateLogsMessage = (log: IOrderLog) => {
  const { createdAt, performedByUser, logType, writeBy } = log;
  switch (logType) {
    case EOrderLog.CREATED:
      return (
        <div>
          <div className="flex flex-col text-[15px] font-medium">
            <div className="flex w-full flex-nowrap space-x-1">
              <p>
                Đơn hàng tạo bởi{" "}
                <span className="font-semibold text-primary-600">
                  {writeBy === EWriteLogBy.CUSTOMER ? "Khách hàng" : "Admin"} {performedByUser.fullName}
                </span>{" "}
                lúc <span className="font-semibold text-primary-600">{format(new Date(createdAt), "hh:mm a, dd/MM/yyyy")}</span>
              </p>
            </div>
            <p>
              Trạng thái đơn hàng hiện tại đang là <span className="font-semibold text-primary-600">{CONVERT_STATUS[log.status]}</span>
            </p>
          </div>
        </div>
      );

    case EOrderLog.UPDATE:
      return (
        <div className="flex flex-col font-medium">
          <div className="flex w-full flex-nowrap space-x-1">
            <p>
              Đơn hàng cập nhật bởi{" "}
              <span className="font-semibold text-primary-600">
                {writeBy === EWriteLogBy.CUSTOMER ? "Khách hàng" : "Admin"} {performedByUser.fullName}
              </span>
              <span>
                {" "}
                lúc <span className="font-semibold text-primary-600">{format(new Date(createdAt), "hh:mm a, dd/MM/yyyy")}</span>
              </span>
            </p>
          </div>
          <p>
            Trạng thái đơn hàng hiện tại đang là <span className="font-semibold text-primary-600">{CONVERT_STATUS[log.status]}</span>
          </p>
        </div>
      );

    default:
      return null;
  }
};
