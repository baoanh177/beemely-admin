import { COMPLAINT_REASONS_CONVERT, EComplaintStatus, IComplaint } from "@/services/store/complaint/complaint.model";
import { Carousel, Image, Modal } from "antd";
import ComplaintStatusBadge from "./ComplaintStatusBadge";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, message } from "antd";

interface ComplaintItemProps {
  complaint: IComplaint | null;
  onUpdateStatus: (id: string, status: EComplaintStatus) => void;
}

const { confirm } = Modal;

const ComplaintItem = ({ complaint, onUpdateStatus }: ComplaintItemProps) => {
  // Determine available status updates based on current status
  const getAvailableStatusUpdates = (currentStatus: EComplaintStatus) => {
    switch (currentStatus) {
      case EComplaintStatus.PENDING:
        return [
          {
            key: EComplaintStatus.PROCESSING,
            label: "Đang xử lý",
            disabled: false,
          },
          {
            key: EComplaintStatus.REJECTED,
            label: "Hủy khiếu nại",
            disabled: false,
          },
          {
            key: EComplaintStatus.RESOLVED,
            label: "Hoàn tiền",
            disabled: false,
          },
          {
            key: EComplaintStatus.COMPENSATE,
            label: "Bồi thường",
            disabled: false,
          },
        ];

      case EComplaintStatus.PROCESSING:
        return [
          {
            key: EComplaintStatus.RESOLVED,
            label: "Hoàn tiền",
            disabled: false,
          },
          {
            key: EComplaintStatus.REJECTED,
            label: "Hủy khiếu nại",
            disabled: false,
          },
          {
            key: EComplaintStatus.COMPENSATE,
            label: "Bồi thường",
            disabled: false,
          },
        ];

      case EComplaintStatus.RESOLVED:
      case EComplaintStatus.REJECTED:
      case EComplaintStatus.COMPENSATE:
      default:
        return []; // No further status updates possible
    }
  };

  // Handler for status update
  const handleStatusUpdate = (id: string, status: EComplaintStatus) => {
    confirm({
      title: `Xác nhận cập nhật trạng thái khiếu nại sang "${getStatusLabel(status)}"?`,
      centered: true,
      okButtonProps: { style: { backgroundColor: "#662E9B", borderColor: "#662E9B" } },
      onOk: () => {
        onUpdateStatus(id, status);
        message.success(`Đã cập nhật trạng thái khiếu nại sang ${getStatusLabel(status)}`);
      },
      okText: "Xác nhận",
      cancelText: "Hủy",
    });
  };

  // Helper to get human-readable status label
  const getStatusLabel = (status: EComplaintStatus) => {
    const statusLabels = {
      [EComplaintStatus.PENDING]: "Chờ xử lý",
      [EComplaintStatus.PROCESSING]: "Đang xử lý",
      [EComplaintStatus.RESOLVED]: "Đã hoàn tiền",
      [EComplaintStatus.REJECTED]: "Đã hủy",
      [EComplaintStatus.COMPENSATE]: "Bồi thường",
    };
    //@ts-ignore
    return statusLabels[status] || status;
  };

  // Generate dropdown menu items
  const items: MenuProps["items"] = complaint
    ? getAvailableStatusUpdates(complaint.status).map((status) => ({
        key: status.key,
        label: status.label,
        disabled: status.disabled,
        onClick: () => handleStatusUpdate(complaint.id!, status.key as EComplaintStatus),
      }))
    : [];

  return (
    <div>
      {complaint && (
        <div className="mt-4 flex flex-col space-y-4 text-sm">
          <h2 className="text-2xl font-bold">Chi tiết khiếu nại</h2>

          <Carousel arrows infinite={false} className="aspect-square">
            {complaint.images.map((image, index) => (
              <Image
                className="rounded-md"
                key={index}
                src={image}
                alt={`Complaint image ${index + 1}`}
                width={"100%"}
                height={"100%"}
                preview
              />
            ))}
          </Carousel>

          <p>
            Mã đơn hàng:<span className="font-semibold"> #{complaint.order}</span>
          </p>
          <p>
            Lí do khiếu nại:<span className="font-semibold"> {COMPLAINT_REASONS_CONVERT[complaint.reason]}</span>
          </p>
          <p>
            Mô tả:<span className="font-semibold"> {complaint.description}</span>
          </p>
          <p className="flex items-center gap-2">
            Trạng thái khiếu nại:
            <ComplaintStatusBadge status={complaint.status} />
          </p>

          <Dropdown menu={{ items }} trigger={["click"]} disabled={items.length === 0}>
            <div
              className={`flex items-center justify-between space-x-2 rounded-md border p-2 ${
                items.length === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
              role="button"
            >
              <span>{items.length > 0 ? "Cập nhật trạng thái khiếu nại" : "Không thể cập nhật trạng thái"}</span>
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default ComplaintItem;
