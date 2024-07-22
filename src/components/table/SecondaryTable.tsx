import React from "react";
import { Table } from "antd";
import FormInput from "../form/FormInput";
import FormDate from "../form/FormDate";
import { IoSearchOutline } from "react-icons/io5";
import { ColumnsType } from "antd/es/table";
import { ITableData } from "./PrimaryTable";

interface SecondaryTableProps {
  title: string;
  data: ITableData[];
  columns: ColumnsType<ITableData>;
  hideComponents?: string[];
  paginationConfig?: {
    pageSize: number;
    current?: number;
    total?: number;
  };
}

const SecondaryTable: React.FC<SecondaryTableProps> = ({ title, data, hideComponents, paginationConfig, columns }) => {
  return (
    <div className="secondary-table shadow-[0px_4px_30px_0px_rgba(46,45,116,0.05)]">
      {!hideComponents?.includes("transactionHeader") && (
        <div className="flex items-center justify-between gap-3 rounded-lg bg-white px-6 py-[18px]">
          <div className="display-s-semibold text-black-500">{title}</div>
          <div className="flex gap-3">
            <FormInput icon={IoSearchOutline} placeholder="Search product. . ." type="text" />
            <FormDate />
          </div>
        </div>
      )}
      <Table columns={columns} dataSource={data} pagination={!hideComponents?.includes("pagination") ? paginationConfig : false} />
    </div>
  );
};

export default SecondaryTable;
