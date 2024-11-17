import FormGroup from "@/components/form/FormGroup";
import ManagementGrid from "@/components/grid/ManagementGrid";
import { ITableData } from "@/components/table/PrimaryTable";
import { useMemo } from "react";

const ItemsGroup = ({ items, order }: any) => {
  const data: ITableData[] = useMemo(() => {
    return (
      items?.map((item: any) => {
        // const formattedDate = format(new Date(order.createdAt), "dd/MM/yyyy, hh:mm a");

        return {
          key: item.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.price.toLocaleString(),
        };
      }) || []
    );
  }, [items]);
  const tableColumns: any = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price: number) => <>{price} VND</>,
    },
  ];

  return (
    <FormGroup title="">
      <div className="tho">
        {/* @ts-ignore */}
        <ManagementGrid isTableLoading={false} columns={tableColumns} data={data} search={{}} buttons={[]} />
      </div>
      <div className="mr-4 inline-flex flex-col items-end gap-2 font-[ps-Bold] text-[14px] font-medium">
        <p>
          Tổng phụ: <span className="text-[#677085]">{order.regularTotalPrice?.toLocaleString()} VND</span>
        </p>
        <p>
          Phí vận chuyển: <span className="text-[#677085]">{order.shippingFee.toLocaleString()} VND</span>
        </p>
        <p>
          Mã giảm giá: <span className="text-[#677085]">{order.voucher.name} </span>
        </p>
        {order.discountPrice && (
          <p>
            Giá được giảm: <span className="text-[#677085]">-{order?.discountPrice.toLocaleString()} VND</span>
          </p>
        )}
        <p style={{ borderTop: "1px solid black", paddingTop: "1rem" }}>
          Tổng tiền: <span className="text-[#677085]">{order.totalPrice.toLocaleString()} VND</span>
        </p>
      </div>
    </FormGroup>
  );
};

export default ItemsGroup;
