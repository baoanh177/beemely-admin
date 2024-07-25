import { ConfigProvider, Pagination as AntdPagination } from "antd";
import { ThemeConfig } from "antd/es/config-provider/context";

interface IPaginationProp {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
}

const Pagination = ({ current, pageSize, total, showSizeChanger }: IPaginationProp) => {
  const getShowingText = (total: number, range: [number, number]) => {
    return `Hiển thị ${range[0]}-${range[1]} từ ${total}`;
  };

  const theme: ThemeConfig = {
    components: {
      Pagination: {
        itemActiveBg: "#883DCF",
        colorPrimary: "#FFFFFF",
        colorPrimaryHover: "#FFFFFF",
        colorText: "#883DCF",
      },
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="table-pagination">
        <AntdPagination
          className="pagination"
          current={current}
          pageSize={pageSize}
          total={total}
          showTotal={getShowingText}
          showSizeChanger={showSizeChanger}
        />
      </div>
    </ConfigProvider>
  );
};

export default Pagination;
