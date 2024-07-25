import { ConfigProvider, Pagination as AntdPagination } from "antd";
import { ThemeConfig } from "antd/es/config-provider/context";
import PaginationText from "./PaginationText";

interface IPaginationProp {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
}

const Pagination = ({ current, pageSize, total, showSizeChanger }: IPaginationProp) => {
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
      <div className="pagination">
        <AntdPagination current={current} pageSize={pageSize} total={total} showTotal={PaginationText} showSizeChanger={showSizeChanger} />
      </div>
    </ConfigProvider>
  );
};

export default Pagination;
