import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import SearchDataTable from "../SearchDataTable";
import FormInput from "../form/FormInput";
import FormDate from "../form/FormDate";
import { IoSearchOutline } from "react-icons/io5";

export interface DataType {
    key: React.Key;
    [key: string]: unknown;
}

interface IPrimaryTableProps {
    search: false | { status: { value: string; label: string }[] };
    columns: ColumnsType<DataType>;
    data: DataType[];
    pagination?: { pageSize: number; current: number; total: number };
}

const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    selectedRowKeys;
    selectedRows;
};

const PrimaryTable: React.FC<IPrimaryTableProps> = ({ search, columns, data, pagination }) => {
    return (
        <div className="flex flex-col gap-6">
            {search && (
                <div className="flex justify-between">
                    <SearchDataTable options={[
                        { value: "1", label: "All Product" },
                        { value: "2", label: "Published" },
                        { value: "3", label: "Draft" },
                        { value: "4", label: "Low Stock" },
                    ]} />
                    <div className="flex gap-4">
                        <FormInput icon={IoSearchOutline} placeholder="Search product. . ." type="text" />
                        <FormDate />
                    </div>
                </div>
            )}
            <Table rowSelection={{ onChange: onSelectChange }} columns={columns} dataSource={data} pagination={pagination && pagination} />
        </div>
    );
};

export default PrimaryTable;
