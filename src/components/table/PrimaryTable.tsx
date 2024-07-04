import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface DataType {
    key: React.Key;
    [key: string]: unknown;
}

interface IPrimaryTableProps {
    search: false | { status: { value: string, label: string }[] };
    columns: ColumnsType<DataType>;
    data: DataType[];
    pagination?: { pageSize: number, current: number, total: number }
}

const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    selectedRowKeys;
    selectedRows;
};

const PrimaryTable: React.FC<IPrimaryTableProps> = ({ search, columns, data, pagination }) => {
    return (
        <>
            {search && (
                <div>search</div>
            )}
            <Table
                rowSelection={{ onChange: onSelectChange }}
                columns={columns}
                dataSource={data}
                pagination={pagination && pagination}
            />
        </>
    );
};

export default PrimaryTable;
