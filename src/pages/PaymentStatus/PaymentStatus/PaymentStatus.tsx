import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IPaymentStatusInitialState, resetStatus, setFilter } from "@/services/store/paymentStatus/paymentStatus.slice";
import { deletePaymentStatus, getAllPaymentStatuses } from "@/services/store/paymentStatus/paymentStatus.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IPaymentStatusInitialState>("paymentStatus");

  useFetchStatus({
    module: "paymentStatus",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllPaymentStatusesLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllPaymentStatuses({ query: state.filter })), "getAllPaymentStatusesLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType<ITableData> = [
    {
      dataIndex: "name",
      title: "Tên",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.paymentStatuses && state.paymentStatuses.length > 0) {
      return state.paymentStatuses.map((paymentStatus) => ({
        key: paymentStatus.id,
        name: paymentStatus.name,
      }));
    }
    return [];
  }, [state.paymentStatuses]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/payment-statuses/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_PAYMENT_STATUS,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deletePaymentStatus({ param: record.key }));
      },
      permission: EPermissions.DELETE_PAYMENT_STATUS,
    },
  ];

  return (
    <>
      <Heading
        title="Trạng thái thanh toán"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_PAYMENT_STATUS,
            text: "Tạo mới Trạng thái thanh toán",
            onClick: () => navigate("/payment-statuses/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllPaymentStatusesLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={{
          input: {
            placeholder: "Tìm kiếm Trạng thái thanh toán",
            onChange(value) {
              dispatch(setFilter({ ...state.filter, name: value }));
            },
          },
        }}
      />
    </>
  );
};

export default PaymentStatus;
