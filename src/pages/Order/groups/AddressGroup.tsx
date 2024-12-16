import imgPayos from "@/assets/images/Payos Logo.svg";
import imgVnPay from "@/assets/images/vnpay.webp";
import codImage from "@/assets/images/cod-logo.svg";
import StatusBadge from "@/components/common/StatusBadge";
import FormGroup from "@/components/form/FormGroup";
import { Image } from "antd";

const AddressGroup = ({ order }: any) => {
  return (
    <FormGroup className="flex flex-col lg:flex-row" title="">
      <div className="flex flex-col gap-2">
        <h4 className="text-xl-semibold text-black-500"> Địa chỉ giao hàng</h4>
        <span className="capitalize">{order.user.fullName}</span>
        <span className="font-[13.3px] capitalize text-[#5e6e82]">{order.shippingAddress}</span>
        <span className="">
          Email: <span className="cursor-pointer text-[#2C7BE5] hover:underline">{order.user.email}</span>
        </span>
        <span className="capitalize">
          {" "}
          Số điện thoại: <span className="cursor-pointer text-[#2C7BE5] hover:underline">{order.user.phone}</span>
        </span>
      </div>
      <div className="mt-12 flex flex-col gap-2 lg:ml-64 lg:mt-0">
        <h4 className="text-xl-semibold text-black-500"> Phương thức thanh toán</h4>
        <div className="flex flex-row items-center justify-start gap-2">
          {order.paymentType === "payos" ? (
            <Image width={100} height={40} preview={false} src={imgPayos} />
          ) : order.paymentType === "cod" ? (
            <Image width={50} height={50} preview={false} src={codImage} />
          ) : (
            <Image width={90} height={20} preview={false} src={imgVnPay} />
          )}
          {order.paymentStatus === "pending" ? (
            <StatusBadge text={"Chờ thanh toán"} color="yellow" />
          ) : order.paymentStatus === "completed" ? (
            <StatusBadge text={"Đã hoàn thành"} color="green-capital" />
          ) : (
            <StatusBadge text={"Thất bại"} color="red" />
          )}{" "}
        </div>
      </div>
    </FormGroup>
  );
};

export default AddressGroup;
