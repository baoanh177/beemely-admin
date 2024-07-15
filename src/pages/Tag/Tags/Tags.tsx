import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ITagInitialState, resetStatus, setFilter } from "@/services/store/tag/tag.slice";
import { deleteTag, getAllTags } from "@/services/store/tag/tag.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    dispatch(getAllTags({ query: state.filter }));
  }, [JSON.stringify(state.filter)]);

  const columns: ColumnsType = [
    {
      dataIndex: "name",
      title: "Name",
    },
    {
      dataIndex: "description",
      title: "Description",
    },
  ];
  const data: ITableData[] = useMemo(() => {
    if (state.tags && state.tags.length > 0) {
      return state.tags.map((tag) => ({
        key: tag.id,
        name: tag.name,
        description: tag.description,
      }));
    }
    return [];
  }, [JSON.stringify(state.tags)]);

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
        title="Tags"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_TAG,
            text: "Create Tag",
            onClick: () => navigate("/tags/create"),
          },
        ]}
      />
      <ManagementGrid columns={columns} data={data} setFilter={setFilter} search={{ status: [] }} buttons={buttons} />
    </>
  );
};

export default Tags;
