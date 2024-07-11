import { ColumnsType } from "antd/es/table";
import PrimaryTable, { ISearchTable, ITableData } from "./table/PrimaryTable";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { useMemo } from "react";
import { ButtonTypes } from "@/shared/enums/button";
import GridButtons from "./GridButtons";
import { TableColumnsType } from "antd";

export interface IGridProps {
  columns: ColumnsType,
  data: ITableData[],
  search: ISearchTable | false,
  buttons?: IGridButton[]
}

const Grid = ({ columns, data, search, buttons }: IGridProps) => {
  const renderColumns = useMemo(() => {
    return buttons?.some((button) => button.type === ButtonTypes.VIEW || button.type === ButtonTypes.UPDATE || button.type === ButtonTypes.DELETE)
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
  return <PrimaryTable search={search} columns={renderColumns} data={data} />
};

export default Grid;
