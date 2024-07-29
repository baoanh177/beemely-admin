import { ColumnsType } from "antd/es/table";
import PrimaryTable, { ISearchTable, ITableData } from "../table/PrimaryTable";
import { IGridButton, ISearchParams } from "@/shared/utils/shared-interfaces";
import { useMemo } from "react";
import { EButtonTypes } from "@/shared/enums/button";
import GridButtons from "./GridButtons";
import { TableColumnsType } from "antd";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { IAdvancedSearchProp } from "../search/AdvancedSearch";

export interface IGridProps {
  columns: ColumnsType;
  data: ITableData[];
  search: ISearchTable | false;
  buttons?: IGridButton[];
  isTableLoading?: boolean;
  pagination?: {
    pageSize: number;
    current: number;
    total: number;
  };
  advancedSearch?: IAdvancedSearchProp;
  setFilter: ActionCreatorWithPayload<ISearchParams>;
}

const ManagementGrid = ({ advancedSearch, columns, data, search, buttons, pagination, isTableLoading, setFilter }: IGridProps) => {
  const renderColumns = useMemo(() => {
    return buttons?.some(
      (button) => button.type === EButtonTypes.VIEW || button.type === EButtonTypes.UPDATE || button.type === EButtonTypes.DELETE,
    )
      ? ([
          ...columns,
          {
            title: "Hành động",
            width: "150px",
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
    <PrimaryTable
      advancedSearch={advancedSearch}
      search={search}
      columns={renderColumns}
      data={data}
      isTableLoading={isTableLoading}
      pagination={pagination}
      setFilter={setFilter}
    />
  );
};

export default ManagementGrid;
