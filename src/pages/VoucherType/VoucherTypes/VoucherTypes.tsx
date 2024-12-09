import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IVoucherTypeInitialState, resetStatus, setFilter } from "@/services/store/voucherType/voucherType.slice";
import { deleteVoucherType, getAllVoucherTypes } from "@/services/store/voucherType/voucherType.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const VoucherTypes = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IVoucherTypeInitialState>("voucherType");
  const defaultSearch: IDefaultSearchProps = {
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
    module: "voucherType",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllVoucherTypesLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllVoucherTypes({ query: state.filter })), "getAllVoucherTypesLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType = [
    {
      dataIndex: "name",
      title: "Tên",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.voucherTypes && state.voucherTypes.length > 0) {
      return state.voucherTypes.map((voucherType) => ({
        key: voucherType.id!,
        name: voucherType.name,
      }));
    }
    return [];
  }, [state.voucherTypes]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/voucherTypes/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_VOUCHER_TYPE,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteVoucherType({ param: record.key }));
      },
      permission: EPermissions.DELETE_VOUCHER_TYPE,
    },
  ];

  return (
    <>
      <Heading
        title="Loại mã giảm giá"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_VOUCHER_TYPE,
            text: "Tạo mới Loại mã giảm giá",
            onClick: () => navigate("/voucherTypes/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllVoucherTypesLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={defaultSearch}
      />
    </>
  );
};

export default VoucherTypes;
