import Heading from "@/components/layout/Heading";
import { GoDownload } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { EPermissions } from "@/shared/enums/permissions";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IOrderInitialState, resetStatus, setFilter } from "@/services/store/order/order.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getAllOrder } from "@/services/store/order/order.thunk";
import { ITableData } from "@/components/table/PrimaryTable";
import { useMemo } from "react";
import ManagementGrid from "@/components/grid/ManagementGrid";
import { EActiveStatus } from "@/shared/enums/status";
import { IoSearchOutline } from "react-icons/io5";
import StatusBadge from "@/components/common/StatusBadge";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { Image } from "antd";
import imgZaloPay from "@/assets/images/ZaloPayLogo.png";
import imgVnPay from "@/assets/images/vnpay.webp";

const Orders = () => {
  const { state, dispatch } = useArchive<IOrderInitialState>("order");
  useFetchStatus({
    module: "order",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllOrderLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllOrder({ query: { _pagination: false, ...state.filter } })), "getAllOrderLoading"),
    [JSON.stringify(state.filter)],
  );

  const defaultSearch: IDefaultSearchProps = {
    filterOptions: {
      name: "status",
      options: [
        { label: "Kích hoạt", value: String(EActiveStatus.ACTIVE) },
        { label: "Chưa kích hoạt", value: String(EActiveStatus.INACTIVE) },
      ],
      onChange: (selectedOption: any) => {
        const statusValue = selectedOption.value;
        dispatch(setFilter({ ...state.filter, status: statusValue }));
      },
    },
    input: {
      type: "text",
      name: "name",
      icon: IoSearchOutline,
      onChange: (value) => {
        dispatch(setFilter({ ...state.filter, name: value }));
      },
      placeholder: "Tìm kiếm theo tên. . .",
    },
  };

  const data: ITableData[] = useMemo(() => {
    return (
      state.orders?.map((order) => {
        const date = new Date(order.createdAt);
        const formattedDate = new Intl.DateTimeFormat("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "America/New_York",
        }).format(date);
        return {
          key: order.id,
          paymentType: order.paymentType,
          paymentStatus: order.paymentStatus,
          totalPrice: order.totalPrice,
          shippingAddress: order.shippingAddress,
          createdAt: formattedDate,
        };
      }) || []
    );
  }, [state.products]);

  console.log(state.orders);
  const tableColumns: any = [
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
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
      dataIndex: "paymentStatus",
      render: (status: string) => (
        <>{status === "pending" ? <StatusBadge text={status} color="yellow" /> : <StatusBadge text={status} color="green-capital" />} </>
      ),
    },
  ];

  // const a = "";
  // const buttons = getGridButtons(dispatch);
  return (
    <>
      <Heading
        title="Đơn hàng"
        hasBreadcrumb
        buttons={[
          {
            text: "Xuất",
            type: "ghost",
            icon: <GoDownload className="text-[18px]" />,
            permission: EPermissions.READ_ORDER,
          },
          {
            text: "Tạo mới Đơn hàng",
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_ORDER,
          },
        ]}
      />
      <ManagementGrid
        isTableLoading={getAllOrderLoading}
        columns={tableColumns}
        data={data}
        search={defaultSearch}
        setFilter={setFilter}
        buttons={[]}
        pagination={{ current: state.filter._page ?? 1, pageSize: state.filter._limit ?? 10, total: state.totalRecords }}
      />
    </>
  );
};

export default Orders;
