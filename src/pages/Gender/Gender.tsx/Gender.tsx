import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { IAdvancedSearch, ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { AppDispatch } from "@/services/store";
import { IGenderInitialState, resetStatus, setFilter } from "@/services/store/gender/gender.slice";
import { deleteGender, getAllGenders, searchGenders } from "@/services/store/gender/gender.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Genders = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IGenderInitialState>("gender");
  const appDispatch = useDispatch<AppDispatch>(); // Sử dụng AppDispatch

  useFetchStatus({
    module: "gender",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const handleSearch = (value: string) => {
    appDispatch(searchGenders({ query: { search: value } }));
  };

  const defaultSearch: IDefaultSearchProps = {
    input: {
      type: "text",
      name: "search",
      placeholder: "Tìm kiếm giới tính...",
    },
    onSearch: handleSearch,
  };
  const advancedSearch: IAdvancedSearch = [
    {
      type: "text",
      name: "123",
      placeholder: "Search orders. . .",
    },
    {
      type: "text",
      name: "1235",
      placeholder: "Search orders. . .",
    },
    {
      type: "status",
      name: "123123321312",
      options: [{ label: "12323", value: "1223323" }],
    },
    {
      type: "date",
    },
  ];
  useFetchStatus({
    module: "gender",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });
  useFetchStatus({
    module: "gender",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllGendersLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllGenders({ query: state.filter })), "getAllGendersLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType<ITableData> = [
    {
      dataIndex: "name",
      title: "Tên",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.genders && state.genders.length > 0) {
      return state.genders.map((gender) => ({
        key: gender.id,
        name: gender.name,
      }));
    }
    return [];
  }, [state.genders]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/genders/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_GENDER,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteGender(record.key));
      },
      permission: EPermissions.DELETE_GENDER,
    },
  ];

  return (
    <>
      <Heading
        title="Giới tính"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_GENDER,
            text: "Tạo mới Giới tính",
            onClick: () => navigate("/genders/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        advancedSearch={advancedSearch}
        data={data}
        isTableLoading={getAllGendersLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._size!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={defaultSearch}
      />
    </>
  );
};

export default Genders;
