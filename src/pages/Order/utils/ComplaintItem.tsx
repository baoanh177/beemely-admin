import { COMPLAINT_REASONS_CONVERT, EComplaintStatus, IComplaint } from "@/services/store/complaint/complaint.model";
import { Carousel, Image, Modal, Input, Dropdown } from "antd";
import ComplaintStatusBadge from "./ComplaintStatusBadge";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { message } from "antd";
import { useState } from "react";

interface ComplaintItemProps {
  complaint: IComplaint | null;
  onUpdateStatus: (id: string, status: EComplaintStatus, rejectionReason?: string) => void;
}

const { TextArea } = Input;

const ComplaintItem = ({ complaint, onUpdateStatus }: ComplaintItemProps) => {
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [isRejectModalVisible, setIsRejectModalVisible] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<EComplaintStatus | null>(null);

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
            disabled: true,
          },
          {
            key: EComplaintStatus.RESOLVED,
            label: "Hoàn tiền cho khách hàng",
            disabled: true,
          },
          {
            key: EComplaintStatus.COMPENSATE,
            label: "Gửi bù hàng cho khách",
            disabled: true,
          },
        ];

      case EComplaintStatus.PROCESSING:
        return [
          {
            key: EComplaintStatus.REJECTED,
            label: "Hủy khiếu nại",
            disabled: false,
          },
          {
            key: EComplaintStatus.RESOLVED,
            label: "Đồng ý yêu cầu trả hàng",
            disabled: false,
          },
          {
            key: EComplaintStatus.COMPENSATE,
            label: "Gửi bù hàng cho khách",
            disabled: false,
          },
        ];

      case EComplaintStatus.RESOLVED:
      case EComplaintStatus.REJECTED:
      case EComplaintStatus.COMPENSATE:
      default:
        return [];
    }
  };

  const handleStatusUpdate = (id: string, status: EComplaintStatus) => {
    if (status === EComplaintStatus.REJECTED) {
      setCurrentStatus(status);
      setIsRejectModalVisible(true);
      setRejectionReason("");
    } else {
      Modal.confirm({
        title: (
          <p>
            Xác nhận cập nhật trạng thái khiếu nại sang <strong>{getStatusLabel(status)}</strong>?
          </p>
        ),
        centered: true,
        okButtonProps: { style: { backgroundColor: "#662E9B", borderColor: "#662E9B" } },
        onOk: () => {
          onUpdateStatus(id, status);
          message.success(`Đã cập nhật trạng thái khiếu nại sang ${getStatusLabel(status)}`);
        },
        okText: "Xác nhận",
        cancelText: "Hủy",
      });
    }
  };

  const handleRejectConfirm = () => {
    if (complaint && currentStatus && rejectionReason.trim()) {
      onUpdateStatus(complaint.id!, currentStatus, rejectionReason);
      message.success(`Đã cập nhật trạng thái khiếu nại sang ${getStatusLabel(currentStatus)}`);
      setIsRejectModalVisible(false);
    }
  };

  const getStatusLabel = (status: EComplaintStatus) => {
    const statusLabels = {
      [EComplaintStatus.PENDING]: "Chờ xử lý",
      [EComplaintStatus.PROCESSING]: "Đang xử lý",
      [EComplaintStatus.RESOLVED]: "Trả hàng và hoàn tiền",
      [EComplaintStatus.REJECTED]: "Đã hủy",
      [EComplaintStatus.COMPENSATE]: "Gửi bù hàng",
    };
    //@ts-ignore
    return statusLabels[status] || status;
  };

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

          {complaint.status === EComplaintStatus.REJECTED && complaint.rejectReason && (
            <p>
              Lí do từ chối khiếu nại từ người bán:
              <strong className="ml-2">{complaint.rejectReason}</strong>
            </p>
          )}

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

      <Modal
        title="Xác nhận hủy khiếu nại"
        open={isRejectModalVisible}
        onOk={handleRejectConfirm}
        onCancel={() => setIsRejectModalVisible(false)}
        okButtonProps={{
          style: { backgroundColor: "#662E9B", borderColor: "#662E9B" },
          disabled: !rejectionReason.trim(),
        }}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p className="mb-2">Vui lòng nhập lý do từ chối:</p>
        <TextArea
          rows={4}
          placeholder="Nhập lý do từ chối khiếu nại"
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ComplaintItem;
