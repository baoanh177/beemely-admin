import imgZaloPay from "@/assets/images/ZaloPayLogo.png";
import imgVnPay from "@/assets/images/vnpay.webp";
import StatusBadge from "@/components/common/StatusBadge";
import { AppDispatch } from "@/services/store";
import { updateOrder } from "@/services/store/order/order.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { Avatar, Image, Select } from "antd";
import { BsEye } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { NavigateFunction, useNavigate } from "react-router-dom";

const { Option } = Select;
// const { confirm } = Modal;
const orderStatusOptions = [
  { value: "pending", label: <StatusBadge text={"Đang chờ"} color="yellow" /> },
  { value: "success", label: <StatusBadge text={"Đã hoàn thành"} color="green-capital" /> },
  { value: "cancelled", label: <StatusBadge text={"Đã hủy"} color="red" /> },
  { value: "processing", label: <StatusBadge text={"Đang tiến hành"} color="blue" /> },
  { value: "shipped", label: <StatusBadge text={"Đang giao hàng"} color="black" /> },
  { value: "delivered", label: <StatusBadge text={"Đã giao thành công"} color="green" /> },
];

export const getTableColumns: any = (dispatch: any) => {
  const navigate = useNavigate();
  return [
    {
      title: "Mã đơn hàng",
      dataIndex: "key",
      render: (_: any, record: any) => (
        <a href={`orders/details/${record.id}`} className="cursor-pointer text-[#2C7BE5] underline">
          #{record.key}
        </a>
      ),
    },
    {
      title: "Người đặt",
      dataIndex: "user",
      render: (user: any) => (
        <div className="flex flex-row items-center justify-center gap-2">
          <Avatar src={user.avatarUrl} />
          <span
            onClick={() => {
              navigate(`/accounts/detail/${user.id}`);
            }}
            className="flex cursor-pointer items-center justify-center gap-1"
          >
            {user.fullName}
            <IoEyeOutline className="cursor-pointer text-xl text-blue-500" />
          </span>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (price: number) => <span>{price.toLocaleString()} VND</span>,
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "shippingAddress",
    },
    {
      title: "Phương thức giao hàng",
      dataIndex: "paymentType",
      render: (paymentType: string) => (
        <>
          {paymentType === "zalopay" ? (
            <Image width={90} height={30} preview={false} src={imgZaloPay} />
          ) : (
            <Image width={90} height={20} preview={false} src={imgVnPay} />
          )}{" "}
        </>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      render: (_: any, record: any) => {
        // const [currentStatus, setCurrentStatus] = useState(record.orderStatus);
        return (
          <Select
            className="tho-border"
            onChange={(status: string) => {
              // confirm({
              //   title: "Xác nhận cập nhật trạng thái",
              //   content: "Bạn có chắc chắn muốn cập nhật trạng thái đơn hàng này?",
              //   onOk: () => {
              //     dispatch(
              //       updateOrder({
              //         body: { order_status: status },
              //         param: record.id,
              //       }),
              //     );
              //     setCurrentStatus(status);
              //   },
              //   onCancel: () => {
              //     setCurrentStatus(record.orderStatus);
              //   },
              // });
              dispatch(
                updateOrder({
                  body: { order_status: status },
                  param: record.id,
                }),
              );
            }}
            defaultValue={record.orderStatus}
            style={{ width: 200 }}
          >
            {orderStatusOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
    },
  ];
};

export const getGridButtons = (dispatch: AppDispatch, navigate: NavigateFunction): IGridButton[] => {
  return [
    {
      type: EButtonTypes.VIEW,
      onClick(record) {
        navigate(`/orders/details/${record.key}`);
      },
      permission: EPermissions.READ_ACCOUNT,
    },
  ];
};
