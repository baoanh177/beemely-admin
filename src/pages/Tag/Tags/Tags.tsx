import { useMemo } from "react";
import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IAdvancedSearch, ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ITagInitialState, resetStatus, setFilter } from "@/services/store/tag/tag.slice";
import { deleteTag, getAllTags, updateTag } from "@/services/store/tag/tag.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import ImageTable from "@/components/table/ImageTable";
import { ITag } from "@/services/store/tag/tag.model";
import { EActiveStatus, EStatusName } from "@/shared/enums/status";
import { IoSearchOutline } from "react-icons/io5";
import StatusBadge from "@/components/common/StatusBadge";

const Tags = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<ITagInitialState>("tag");
  const defaultSearch: IDefaultSearchProps = {
    filterOptions: {
      name: "status",
      options: [
        { label: "Kích hoạt", value: String(EActiveStatus.ACTIVE) },
        { label: "Chưa kích hoạt", value: String(EActiveStatus.INACTIVE) },
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
    module: "tag",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const advancedSearch: IAdvancedSearch = [
    {
      type: "text",
      name: "parent_id",
      icon: IoSearchOutline,
      placeholder: "Tìm theo parent...",
      onChange: (value) => {
        dispatch(setFilter({ ...state.filter, parent_id: value }));
      },
    },
  ];

  const { getAllTagsLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllTags({ query: { _pagination: false, ...state.filter } })), "getAllTagsLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType<ITag> = [
    {
      dataIndex: "name",
      title: "Tên",
      width: "40%",
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
    {
      render: (record) => (record.parent_id ? record.parent_id.name : ""),
      title: "Thẻ cha",
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
    if (state.tags && state.tags.length > 0) {
      return state.tags.map((tag) => ({
        id: tag.id,
        key: tag.id,
        name: tag.name,
        image: tag.image,
        status: tag.status,
        description: tag.description,
        parent_id: tag.parentId,
      }));
    }

    return [];
  }, [state.tags]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.ACTIVE,
      onClick: (record) => {
        const updatedTag = {
          name: record.name,
          image: record.image,
          description: record.description,
          parentId: record.parentId,
          status: record.status === EActiveStatus.ACTIVE ? EActiveStatus.INACTIVE : EActiveStatus.ACTIVE,
        };

        dispatch(
          updateTag({
            body: updatedTag,
            param: record.id,
          }),
        );
      },
      permission: EPermissions.UPDATE_TAG,
    },
    {
      type: EButtonTypes.UPDATE,
      onClick: (record) => navigate(`/tags/update/${record?.key}`),
      permission: EPermissions.UPDATE_TAG,
    },
    {
      type: EButtonTypes.DELETE,
      onClick: (record) => dispatch(deleteTag({ param: record.key })),
      permission: EPermissions.DELETE_TAG,
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
      <ManagementGrid
        advancedSearch={advancedSearch}
        columns={columns}
        isTableLoading={getAllTagsLoading}
        data={data}
        setFilter={setFilter}
        search={defaultSearch}
        buttons={buttons}
      />
    </>
  );
};

export default Tags;
