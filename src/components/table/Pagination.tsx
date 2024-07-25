import { Pagination } from "antd"

interface IPaginationProp {
    current: number,
    pageSize: number,
    total: number,
    showSizeChanger?: boolean
}
const TablePagination = ({ current, pageSize, total,showSizeChanger }: IPaginationProp) => {
    const getShowingText = (total: number, range: [number, number]) => {
        return `Hiển thị ${range[0]}-${range[1]} từ ${total}`;
    };
    return (
        <div className="table-pagination">
            <Pagination
                className="pagination"
                current={current}
                pageSize={pageSize}
                total={total}
                showTotal={getShowingText}
                showSizeChanger={showSizeChanger}
            />
        </div>
    )
}
export default TablePagination