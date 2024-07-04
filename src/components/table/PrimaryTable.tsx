import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface DataType {
    key: React.Key;
    product: string;
    [key: string]: unknown;
}
interface IPrimaryTableProps {
    search: false | { status: { value: string, label: string }[] }
    columns: ColumnsType<DataType>;
    data: DataType[];
}
const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    selectedRowKeys
    selectedRows
};
const PrimaryTable: React.FC<IPrimaryTableProps> = ({ search, columns, data }) => {
    return (
        <>
            {search && (
                <div>search</div>
            )}
            <Table
                rowSelection={{ onChange: onSelectChange }}
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 6 }} />
        </>
    );
};
export default PrimaryTable;
