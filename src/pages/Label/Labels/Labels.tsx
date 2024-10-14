import StatusBadge from "@/components/common/StatusBadge";
import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { ILabelInitialState, resetStatus, setFilter } from "@/services/store/label/label.slice";
import { deleteLabel, getAllLabels, updateLabel } from "@/services/store/label/label.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { EActiveStatus, EStatusName } from "@/shared/enums/status";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
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
        { label: "Kích hoạt", value: `${EActiveStatus.ACTIVE}` },
        { label: "Chưa kích hoạt", value: `${EActiveStatus.INACTIVE}` },
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

  const { getAllLabelsLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllLabels({ query: state.filter })), "getAllLabelsLoading"),
    [JSON.stringify(state.filter)],
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
      type: EButtonTypes.ACTIVE,
      onClick: (record) => {
        const updatedLabel = {
          name: record.name,
          description: record.description,
          status: record.status === EActiveStatus.ACTIVE ? EActiveStatus.INACTIVE : EActiveStatus.ACTIVE,
        };
        dispatch(
          updateLabel({
            body: updatedLabel,
            param: record.id,
          }),
        );
      },
      permission: EPermissions.UPDATE_TAG,
    },
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
        dispatch(deleteLabel({ param: record.key }));
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
          isTableLoading={getAllLabelsLoading ?? true}
          pagination={{
            current: state.filter._page!,
            pageSize: state.filter._limit!,
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
