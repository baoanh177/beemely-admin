import { ColumnsType } from "antd/es/table";
import PrimaryTable, { ISearchTable, ITableData } from "../table/PrimaryTable";
import { IGridButton, ISearchParams } from "@/shared/utils/shared-interfaces";
import { useMemo } from "react";
import { EButtonTypes } from "@/shared/enums/button";
import GridButtons from "./GridButtons";
import { TableColumnsType } from "antd";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export interface IGridProps {
  columns: ColumnsType;
  data: ITableData[];
  search: ISearchTable | false;
  buttons?: IGridButton[];
  pagination?: {
    pageSize: number;
    current: number;
    total: number;
  };
  setFilter: ActionCreatorWithPayload<ISearchParams>;
}

const ManagementGrid = ({ columns, data, search, buttons, pagination, setFilter }: IGridProps) => {
  const renderColumns = useMemo(() => {
    return buttons?.some((button) => button.type === EButtonTypes.VIEW || button.type === EButtonTypes.UPDATE || button.type === EButtonTypes.DELETE)
      ? ([
          ...columns,
          {
            title: "Actions",
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
  return <PrimaryTable search={search} columns={renderColumns} data={data} pagination={pagination} setFilter={setFilter} />;
};

export default ManagementGrid;
