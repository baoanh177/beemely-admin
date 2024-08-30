import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IFlagPageInitialState, resetStatus, setFilter } from "@/services/store/flagPage/flagPage.slice";
import { deleteFlagPage, getAllFlagPage } from "@/services/store/flagPage/flagPage.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const FlagPages = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IFlagPageInitialState>("flagPage");
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
    module: "flagPage",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllFlagPagesLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllFlagPage({ query: state.filter })), "getAllFlagPagesLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType<ITableData> = [
    {
      dataIndex: "name",
      title: "Tên",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.flagPages && state.flagPages.length > 0) {
      return state.flagPages.map((flagPage) => ({
        key: flagPage.id,
        name: flagPage.name,
      }));
    }
    return [];
  }, [state.flagPages]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/flag-pages/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_FLAG_PAGE,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteFlagPage({ param: record.key }));
      },
      permission: EPermissions.DELETE_FLAG_PAGE,
    },
  ];

  return (
    <>
      <Heading
        title="Trang đánh dấu"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_FLAG_PAGE,
            text: "Tạo mới Trang đánh dấu",
            onClick: () => navigate("/flag-pages/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllFlagPagesLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={defaultSearch}
      />
    </>
  );
};

export default FlagPages;
