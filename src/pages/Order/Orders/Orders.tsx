import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IOrderInitialState, resetStatus, setFilter } from "@/services/store/order/order.slice";
import { getAllOrder } from "@/services/store/order/order.thunk";
import { EPermissions } from "@/shared/enums/permissions";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { getTableColumns } from "../utils/dataTable";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { IOrder } from "@/services/store/order/order.model";
import "./index.css";

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

  const defaultSearch: IDefaultSearchProps | any = {
    filterOptions: {
      name: "status",
      options: [
        { label: "Chờ xác nhận", value: "pending" },
        { label: "Đang chuẩn bị hàng", value: "processing" },
        { label: "Đang giao hàng", value: "delivering" },
        { label: "Giao thành công", value: "delivered" },
        { label: "Đã nhận hàng", value: "success" },
        { label: "Đã hủy", value: "cancelled" },
        { label: "Đang khiếu nại", value: "request_return" },
        { label: "Hủy yc hoàn trả", value: "denied_return" },
        { label: "Đang hoàn trả", value: "returning" },
      ],
      onChange: (selectedOption: any) => {
        const statusValue = selectedOption.value;
        dispatch(setFilter({ ...state.filter, order_status: statusValue }));
      },
    },
    input: {
      type: "text",
      name: "name",
      icon: IoSearchOutline,
      onChange: (value: any) => {
        dispatch(setFilter({ ...state.filter, order_id: value }));
      },
      placeholder: "Tìm kiếm theo tên. . .",
    },
  };
  const advancedSearch: any = [
    {
      type: "date",
      name: "parent_id",
      icon: IoSearchOutline,
      placeholder: "Tìm theo thời gian...",
      onChange: (dates: any) => {
        const [startDate, endDate] = dates;
        dispatch(setFilter({ ...state.filter, start_date: startDate.format("YYYY-MM-DD"), end_date: endDate.format("YYYY-MM-DD") }));
      },
    },
  ];

  const data: ITableData[] = useMemo(() => {
    return (
      state.orders?.map((order) => {
        const formattedDate = format(new Date(order.createdAt), "dd/MM/yyyy, hh:mm a");

        return {
          id: order.id,
          key: order.uniqueId,
          orderStatus: order.orderStatus,
          paymentType: order.paymentType,
          paymentStatus: order.paymentStatus,
          complaint: order.complaint,
          totalPrice: order.totalPrice,
          shippingAddress: order.shippingAddress,
          createdAt: formattedDate || "",
          user: order.user,
        };
      }) || []
    );
  }, [state.orders]);

  const tableColumns = getTableColumns(dispatch);

  const exportToExcel = useCallback(
    async (data: IOrder[]) => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Danh sách đơn hàng");

      const columns = [
        { header: "Mã đơn hàng", key: "uniqueId", width: 20 },
        { header: "Tên khách hàng", key: "userName", width: 25 },
        { header: "Email", key: "userEmail", width: 30 },
        { header: "Số điện thoại", key: "phoneNumber", width: 20 },
        { header: "Địa chỉ nhận hàng", key: "shippingAddress", width: 20 },
        { header: "Trạng thái đơn hàng", key: "orderStatus", width: 25 },
        { header: "Trạng thái thanh toán", key: "paymentStatus", width: 25 },
        { header: "Tổng tiền sản phẩm", key: "regularTotalPrice", width: 20 },
        { header: "Giảm giá áp dụng voucher", key: "discountPrice", width: 25 },
        { header: "Phí vận chuyển", key: "shippingFee", width: 20 },
        { header: "Tổng tiền", key: "totalPrice", width: 15 },
        { header: "Ngày đặt hàng", key: "createdAt", width: 20 },
      ];

      // Đặt cột cho worksheet
      worksheet.columns = columns;

      // Định dạng header
      worksheet.getRow(1).eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF4472C4" }, // Màu xanh dương
        };
        cell.font = {
          color: { argb: "FFFFFFFF" }, // Chữ màu trắng
          bold: true,
        };
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Thêm dữ liệu
      const formattedData = data.map((item) => ({
        ...item,
        createdAt: format(item.createdAt as string, "yyyy-MM-dd"),
        totalPrice: Number(item.totalPrice).toLocaleString("vi-VN") + " đ",
        regularTotalPrice: Number(item.regularTotalPrice).toLocaleString("vi-VN") + " đ",
      }));

      // Thêm các dòng dữ liệu
      worksheet.addRows(formattedData);

      // Định dạng các ô dữ liệu
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          row.eachCell((cell) => {
            cell.alignment = {
              vertical: "middle",
              horizontal: "left",
              wrapText: true,
            };
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });
        }
      });

      // Lưu file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, `Danh_sach_don_hang_${format(new Date(), "yyyyMMdd")}.xlsx`);
    },
    [state.orders],
  );

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        await dispatch(getAllOrder({ query: { _pagination: false, ...state.filter } }));
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);
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
            onClick: () => exportToExcel(state.orders),
          },
          {
            text: "Tạo mới Đơn hàng",
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_ORDER,
          },
        ]}
      />
      <div className="tho-border">
        <ManagementGrid
          isTableLoading={getAllOrderLoading}
          columns={tableColumns}
          data={data}
          search={defaultSearch}
          advancedSearch={advancedSearch}
          setFilter={setFilter}
          buttons={[]}
          pagination={{ current: state.filter._page ?? 1, pageSize: state.filter._limit ?? 10, total: state.totalRecords }}
        />
      </div>
    </>
  );
};

export default Orders;
