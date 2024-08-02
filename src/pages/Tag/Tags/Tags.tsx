import { useMemo } from "react";
import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IAdvancedSearch, ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ITagInitialState, resetStatus, setFilter } from "@/services/store/tag/tag.slice";
import { deleteTag, getAllTags } from "@/services/store/tag/tag.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import ImageTable from "@/components/table/ImageTable";
import FormSwitch from "@/components/form/FormSwitch";

export const defaultSearch: IDefaultSearchProps = {
  options: [{ label: "123", value: "123" }],
  input: {
    type: "text",
    name: "123",
    placeholder: "Search ordersss. . .",
  },
};

export const advancedSearch: IAdvancedSearch = [
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

const Tags = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<ITagInitialState>("tag");

  useFetchStatus({
    module: "tag",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllTagsLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllTags({ query: state.filter })), "getAllTagsLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType = [
    {
      dataIndex: "name",
      title: "Tên",
    },
    {
      dataIndex: "slug",
      title: "Slug",
    },
    {
      dataIndex: "status",
      title: "Status",
      render: (status) => <FormSwitch value={status} />,
    },
    {
      dataIndex: "image",
      title: "Image",
      render: (image) => <ImageTable imageSrc={image} />,
    },
    {
      dataIndex: "description",
      title: "Mô tả",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.tags && state.tags.length > 0) {
      return state.tags.map((tag) => ({
        key: tag.id!,
        name: tag.name,
        slug: tag.slug,
        image: tag.image,
        parentId: tag.parentId,
        description: tag.description,
        status: tag.status,
        children: state.tags.filter(t => t.parentId === tag.id).map(child => ({
          key: child.id!,
          name: child.name,
          slug: child.slug,
          image: child.image,
          parentId: child.parentId,
          description: child.description,
          status: child.status,
        })),
      }));
    }
    return [];
  }, [state.tags]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/tags/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_TAG,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteTag(record?.key));
      },
      permission: EPermissions.UPDATE_TAG,
    },
  ];

  return (
    <>
      <Heading
        title="Thẻ"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_TAG,
            text: "Tạo mới Thẻ",
            onClick: () => navigate("/tags/create"),
          },
        ]}
      />
      {
        <ManagementGrid
          advancedSearch={advancedSearch}
          columns={columns}
          isTableLoading={getAllTagsLoading && true}
          data={data}
          pagination={{ current: state.filter._page!, pageSize: state.filter._size!, total: state.totalRecords }}
          setFilter={setFilter}
          search={defaultSearch}
          buttons={buttons}
         
        />
      }
    </>
  );
};

export default Tags;
