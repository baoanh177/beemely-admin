import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IVoucher } from "@/services/store/voucher/voucher.model";
import { IVoucherInitialState, resetStatus, setFilter } from "@/services/store/voucher/voucher.slice";
import { deleteVoucher, getAllVouchers, updateVoucher } from "@/services/store/voucher/voucher.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { EActiveStatus, EStatusName } from "@/shared/enums/status";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import {  useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { IoSearchOutline } from "react-icons/io5";
import StatusBadge from "@/components/common/StatusBadge";
const Vouchers = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IVoucherInitialState>("voucher");

  const defaultSearch: IDefaultSearchProps = {
    filterOptions: {
      name: "status",
      options: [
        { label: "Kích hoạt", value: `${EActiveStatus.ACTIVE}` },
        { label: "Chưa kích hoạt", value: `${EActiveStatus.INACTIVE}` },
      ],
      onChange: (selectedOption) => {
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

  useFetchStatus({
    module: "voucher",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllVouchersLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllVouchers({ query: state.filter })), "getAllVouchersLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType<IVoucher> = [
    {
      dataIndex: "name",
      title: "Tên",
    },
    {
      dataIndex: "code",
      title: "Mã giảm giá",
    },
    {
      dataIndex: "discountTypes",
      title: "Loại giảm giá ",
    },
    {
      dataIndex: "voucherTypeName",
      title: "Loại mã giảm giá",
    },
    {
      dataIndex: "startDate",
      title: "Ngày bắt đầu",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : ""),
    },
    {
      dataIndex: "endDate",
      title: "Ngày kết thúc",
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : ""),
    },
    {
      dataIndex: "status",
      title: "Trạng thái",
      render(_, record) {
        return record.status === EActiveStatus.ACTIVE ? (
          <StatusBadge text={EStatusName.ACTIVE} color="green" />
        ) : (
          <StatusBadge text={EStatusName.INACTIVE} color="red" />
        );
      },
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.vouchers && state.vouchers.length > 0) {
      return state.vouchers.map((voucher) => ({
        ...voucher,
        voucherTypeName: voucher.voucherType,
        key: voucher.id,
      }));
    }
    return [];
  }, [state.vouchers]);
  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.ACTIVE,
      onClick: (record) => {
        const updatedVoucher = {
          minimum_order_price: record.minimumOrderPrice,
          voucher_type: record.voucherType,
          start_date: record.startDate,
          end_date: record.endDate,
          duration: record.duration,
          status: record.status === EActiveStatus.ACTIVE ? EActiveStatus.INACTIVE : EActiveStatus.ACTIVE,
        };

        dispatch(
          updateVoucher({
            body: updatedVoucher,
            param: record.id,
          }),
        );
      },
      permission: EPermissions.UPDATE_TAG,
    },
    {
      type: EButtonTypes.VIEW,
      onClick(record) {
        navigate(`/vouchers/detail/${record?.key}`);
      },
      permission: EPermissions.DELETE_VOUCHER,
    },
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/vouchers/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_VOUCHER,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteVoucher({ param: record.key }));
      },
      permission: EPermissions.DELETE_VOUCHER,
    },
  ];

  return (
    <>
      <Heading
        title="Mã giảm giá"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_LABEL,
            text: "Tạo mới Mã giảm giá",
            onClick: () => navigate("/vouchers/create"),
          },
        ]}
      />
      {
        <ManagementGrid
          isTableLoading={getAllVouchersLoading ?? true}
          search={defaultSearch}
          pagination={{
            current: state.filter._page!,
            pageSize: state.filter._limit!,
            total: state.totalRecords,
          }}
          columns={columns}
          data={data}
          setFilter={setFilter}
          buttons={buttons}
        />
      }
    </>
  );
};

export default Vouchers;
