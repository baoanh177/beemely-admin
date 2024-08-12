import FormSwitch from "@/components/form/FormSwitch";
import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { IAdvancedSearch, ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ILabel } from "@/services/store/label/label.model";
import { ILabelInitialState, resetStatus, setFilter } from "@/services/store/label/label.slice";
import { deleteLabel, getAllLabels, updateLabel } from "@/services/store/label/label.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { EActiveStatus } from "@/shared/enums/status";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useCallback, useMemo } from "react";
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

  const defaultSearch: IDefaultSearchProps = {
    filterOptions: {
      name: "status",
      options: [
        { label: "Chưa kích hoạt", value: `${EActiveStatus.ACTIVE}` },
        { label: "Kích hoạt", value: `${EActiveStatus.INACTIVE}` },
      ],
      onChange: (selectedOption) => {
        const statusValue = selectedOption.value;
        dispatch(setFilter({ ...state.filter, status: statusValue }));
      },
    },
    input: {
      type: "text",
      name: "name",
      onChange: (value) => {
        dispatch(setFilter({ ...state.filter, name: value }));
      },
      placeholder: "Tìm kiếm theo tên. . .",
    },
  };
  const advancedSearch: IAdvancedSearch = [
    {
      type: "text",
      name: "description",
      placeholder: "Tìm kiếm theo mô tả",
      onChange: (value) => {
        dispatch(setFilter({ ...state.filter, description: value }));
      },
    },
  ];

  const { getAllLabelsLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllLabels({ query: state.filter })), "getAllLabelsLoading"),
    [JSON.stringify(state.filter)],
  );
  const handleStatusChange = useCallback(
    (checked: boolean, record: ILabel) => {
      const updatedLabel = {
        name: record.name,
        description: record.description,
        status: checked ? EActiveStatus.ACTIVE : EActiveStatus.INACTIVE,
      };
      dispatch(updateLabel({ body: updatedLabel, param: record.id }));
    },
    [dispatch],
  );

  const columns: ColumnsType = [
    {
      dataIndex: "name",
      title: "Tên",
    },
    {
      dataIndex: "description",
      title: "Mô tả",
    },
    {
      dataIndex: "status",
      title: "Status",
      render: (status, record) => {
        return <FormSwitch checked={status === EActiveStatus.ACTIVE} onChange={(checked) => handleStatusChange(checked, record)} />;
      },
    },
  ];
  const data: ITableData[] = useMemo(() => {
    if (state.labels && state.labels.length > 0) {
      return state.labels.map((label) => ({
        key: label.id,
        id: label.id,
        name: label.name,
        description: label.description,
        status: label.status,
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
          advancedSearch={advancedSearch}
          isTableLoading={getAllLabelsLoading ?? true}
          pagination={{
            current: state.filter._page!,
            pageSize: state.filter._size!,
            total: state.totalRecords,
          }}
          columns={columns}
          data={data}
          setFilter={setFilter}
          search={defaultSearch}
          buttons={buttons}
        />
      }
    </>
  );
};

export default Labels;
