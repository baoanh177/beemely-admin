import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ICategoryInitialState, resetStatus, setFilter } from "@/services/store/category/category.slice";
import { deleteCategory, getAllCategories } from "@/services/store/category/category.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<ICategoryInitialState>("category");
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
    module: "category",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllCategoriesLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllCategories({ query: state.filter })), "getAllCategoriesLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType = [
    {
      dataIndex: "name",
      title: "Tên",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.categories && state.categories.length > 0) {
      return state.categories.map((category) => ({
        key: category.id,
        name: category.name,
      }));
    }
    return [];
  }, [state.categories]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/categories/update/${record?.key}`);
      },
      permission: EPermissions.CREATE_CATEGORY,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteCategory({ param: record.key }));
      },
      permission: EPermissions.DELETE_CATEGORY,
    },
  ];

  return (
    <>
      <Heading
        title="Danh mục"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_CATEGORY,
            text: "Tạo mới Danh mục",
            onClick: () => navigate("/categories/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllCategoriesLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={defaultSearch}
      />
    </>
  );
};

export default Categories;
