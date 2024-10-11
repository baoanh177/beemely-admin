import { useMemo, useCallback } from "react";
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
import FormSwitch from "@/components/form/FormSwitch";
import { handleConvertTags } from "../helpers/convertTags";
import { ITag } from "@/services/store/tag/tag.model";
import { EActiveStatus } from "@/shared/enums/status";
import { IoSearchOutline } from "react-icons/io5";

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
  const handleStatusChange = useCallback(
    (checked: boolean, record: ITag) => {
      const updatedTag = {
        name: record.name,
        image: record.image,
        description: record.description,
        status: checked ? EActiveStatus.ACTIVE : EActiveStatus.INACTIVE,
      };
      dispatch(updateTag({ body: updatedTag, param: record.id }));
    },
    [dispatch],
  );

  const columns: ColumnsType<ITag> = [
    {
      dataIndex: "name",
      title: "Tên",
      width: "40%",
    },
    {
      dataIndex: "image",
      title: "Ảnh",
      render: (image) => <ImageTable imageSrc={image} />,
    },
    {
      dataIndex: "description",
      title: "Mô tả",
    },
    {
      dataIndex: "status",
      title: "Trạng thái",
      render: (status, record) => {
        return <FormSwitch checked={status === EActiveStatus.ACTIVE} onChange={(checked) => handleStatusChange(checked, record)} />;
      },
    },
  ];

  const treeTags: ITableData[] = useMemo(() => {
    return handleConvertTags(state.tags).map((tag) => ({ key: tag.id, ...tag }));
  }, [state.tags]);

  const buttons: IGridButton[] = [
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
        data={treeTags}
        setFilter={setFilter}
        search={defaultSearch}
        buttons={buttons}
      />
    </>
  );
};

export default Tags;
