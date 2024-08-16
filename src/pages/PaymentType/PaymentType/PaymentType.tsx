import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IPaymentTypeInitialState, resetStatus, setFilter } from "@/services/store/paymentType/paymentType.slice";
import { deletePaymentType, getAllPaymentTypes } from "@/services/store/paymentType/paymentType.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentTypes = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IPaymentTypeInitialState>("paymentType");

  useFetchStatus({
    module: "paymentType",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllPaymentTypesLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllPaymentTypes({ query: state.filter })), "getAllPaymentTypesLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType<ITableData> = [
    {
      dataIndex: "name",
      title: "Tên",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.paymentTypes && state.paymentTypes.length > 0) {
      return state.paymentTypes.map((paymentType) => ({
        key: paymentType.id,
        name: paymentType.name,
      }));
    }
    return [];
  }, [state.paymentTypes]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/payment-types/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_PAYMENT_TYPE,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deletePaymentType(record.key));
      },
      permission: EPermissions.DELETE_PAYMENT_TYPE,
    },
  ];

  return (
    <>
      <Heading
        title="Loại thanh toán"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_PAYMENT_TYPE,
            text: "Tạo mới Loại thanh toán",
            onClick: () => navigate("/payment-types/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllPaymentTypesLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._size!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={{
          input: {
            placeholder: "Tìm kiếm Loại thanh toán",
            onChange(value) {
              dispatch(setFilter({ ...state.filter, name: value }));
            },
          },
        }}
      />
    </>
  );
};

export default PaymentTypes;
