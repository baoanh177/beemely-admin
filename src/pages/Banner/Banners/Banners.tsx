import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import ImageTable from "@/components/table/ImageTable";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IBannerInitialState, resetStatus, setFilter } from "@/services/store/banner/banner.slice";
import { deleteBanner, getAllBanners } from "@/services/store/banner/banner.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { debounce } from "lodash";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Banners = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IBannerInitialState>("banner");
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        dispatch(setFilter({ ...state.filter, title: value }));
      }, 300),
    [dispatch, state.filter],
  );

  const defaultSearch: IDefaultSearchProps = {
    input: {
      type: "text",
      name: "title",
      icon: IoSearchOutline,
      onChange: debouncedSearch,
      placeholder: "Tìm kiếm theo tiêu đề. . .",
    },
  };

  useFetchStatus({
    module: "banner",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllBannersLoading } = useAsyncEffect(
    (async) => {
      async(dispatch(getAllBanners({ query: state.filter })), "getAllBannersLoading");
    },
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      render: (imageUrl) => {
        return <ImageTable imageSrc={imageUrl} />;
      },
    },

    {
      dataIndex: "description",
      title: "Mô tả",
    },
    {
      dataIndex: "path",
      title: "Đường dẫn",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (Array.isArray(state.banners)) {
      return state.banners
        .filter((banner) => banner.id)
        .map((banner) => ({
          key: banner.id ?? "default-key",
          title: banner.title,
          imageUrl: banner.imageUrl,
          description: banner.description,
          path: banner.path,
        }));
    }
    return [];
  }, [state.banners]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/banners/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_BANNER,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteBanner({ param: record.key }));
      },
      permission: EPermissions.DELETE_BANNER,
    },
  ];

  return (
    <>
      <Heading
        title="Banner"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_BANNER,
            text: "Tạo mới Banner",
            onClick: () => navigate("/banners/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllBannersLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={defaultSearch}
      />
    </>
  );
};

export default Banners;
