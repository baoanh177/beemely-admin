import { FaPlus } from "react-icons/fa";
import CustomButton from "./Button";
import { Table, TableColumnsType } from "antd";
import { IGridButton, IInitialState } from "@/shared/utils/shared-interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/stores";
import { useMemo } from "react";
import { ButtonTypes } from "@/shared/enums/button";
import GridButtons from "./GridButtons";

interface IDataTableProps<S> {
  hideComponents?: string[];
  columns: TableColumnsType;
  data: unknown[];
  state: S;
  setFilter: Function;
  buttons?: IGridButton[];
}

const DataTable = <S extends IInitialState>({
  buttons,
  columns,
  data,
  state,
  setFilter,
  hideComponents,
}: IDataTableProps<S>) => {
  const dispatch = useDispatch<AppDispatch>();

  const renderColumns = useMemo(() => {
    return buttons?.some(
      (button) =>
        button.type == ButtonTypes.VIEW ||
        button.type == ButtonTypes.UPDATE ||
        button.type == ButtonTypes.DELETE,
    )
      ? ([
          ...columns,
          {
            title: "Actions",
            width: 100,
            dataIndex: "actions",
            key: "actions",
            fixed: "right",
            align: "center",
            render(_, record) {
              return <GridButtons buttons={buttons} record={record} />;
            },
          },
        ] as TableColumnsType)
      : columns;
  }, [JSON.stringify(buttons)]);

  return (
    <>
      <div className="h-full rounded-xl bg-white p-4">
        {buttons?.some((button) => button.type == ButtonTypes.ADD) && (
          <div className="mb-4 flex justify-end">
            <CustomButton
              text="Add new"
              type="primary"
              startContent={<FaPlus />}
              key="add"
              onClick={() =>
                buttons
                  ?.find((button) => button.type == ButtonTypes.ADD)
                  ?.onClick()
              }
            />
          </div>
        )}
        <Table
          rowSelection={{ type: "checkbox" }}
          size="middle"
          columns={renderColumns}
          dataSource={data}
          pagination={
            !hideComponents?.includes("pagination") && {
              pageSize: state.filter.size,
              current: state.filter.page,
              total: state.totalRecords,
              onChange(page, size) {
                dispatch(setFilter({ ...state.filter, page, size }));
              },
            }
          }
        />
      </div>
    </>
  );
};

export default DataTable;
