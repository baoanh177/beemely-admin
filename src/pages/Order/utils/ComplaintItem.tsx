import { COMPLAINT_REASONS_CONVERT, EComplaintStatus, IComplaint } from "@/services/store/complaint/complaint.model";
import { Carousel, Image, Modal } from "antd";
import Button from "@/components/common/Button";
import ComplaintStatusBadge from "./ComplaintStatusBadge";

interface ComplaintItemProps {
  complaint: IComplaint | null;
  onCancel: () => void;
  onOk: () => void;
}

const { confirm } = Modal;

const ComplaintItem = ({ complaint, onCancel, onOk }: ComplaintItemProps) => {
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

          {complaint.status === EComplaintStatus.PENDING && (
            <div className="flex justify-end gap-2">
              <Button
                text="Hủy khiếu nại"
                type="secondary"
                onClick={() =>
                  confirm({
                    title: "Thông tin khiếu nại của khách hàng là sai lệch. Không đồng ý hoàn tiền cho khách hàng?",
                    centered: true,
                    okButtonProps: { style: { backgroundColor: "#662E9B", borderColor: "#662E9B" } },
                    onOk: () => {
                      onCancel();
                    },
                    okText: "Xác nhận",
                    cancelText: "Hủy",
                  })
                }
              />
              <Button
                text="Đồng ý trả hàng và hoàn tiền"
                onClick={() =>
                  confirm({
                    title: "Xác nhận khách khiếu nại chính xác. Đồng ý trả hàng và hoàn tiền cho khách hàng?",
                    centered: true,
                    okButtonProps: { style: { backgroundColor: "#662E9B", borderColor: "#662E9B" } },
                    onOk: () => {
                      onOk();
                    },
                    okText: "Xác nhận",
                    cancelText: "Hủy",
                  })
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComplaintItem;
