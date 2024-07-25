import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ILabelInitialState, resetStatus, setFilter } from "@/services/store/label/label.slice";
import { deleteLabel, getAllLabels } from "@/services/store/label/label.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Labels = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<ILabelInitialState>("label");

  useFetchStatus({
    module: "label",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  useEffect(() => {
    dispatch(getAllLabels({ query: state.filter }));
  }, [JSON.stringify(state.filter)]);

  const columns: ColumnsType = [
    {
      dataIndex: "name",
      title: "Tên",
    },
    {
      dataIndex: "description",
      title: "Mô tả",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.labels && state.labels.length > 0) {
      return state.labels.map((label) => ({
        key: label.id,
        name: label.name,
        description: label.description,
      }));
    }
    return [];
  }, [state.labels]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/labels/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_LABEL,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteLabel(record?.key));
      },
      permission: EPermissions.DELETE_LABEL,
    },
  ];

  return (
    <>
      <Heading
        title="Nhãn"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_LABEL,
            text: "Tạo mới Nhãn",
            onClick: () => navigate("/labels/create"),
          },
        ]}
      />
      {
        <ManagementGrid
          pagination={{
            current: state.filter._page!,
            pageSize: state.filter._size!,
            total: state.totalRecords,
          }}
          columns={columns}
          data={data}
          setFilter={setFilter}
          search={{ status: [] }}
          buttons={buttons}
        />
      }
    </>
  );
};

export default Labels;
