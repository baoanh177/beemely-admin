import Heading from "@/components/layout/Heading";
import { GoDownload } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { EPermissions } from "@/shared/enums/permissions";
import { useNavigate } from "react-router-dom";
import { useArchive } from "@/hooks/useArchive";
import { IProductInitialState } from "@/services/store/product/product.model";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { deleteProduct, getAllProducts } from "@/services/store/product/product.thunk";
import { ColumnsType } from "antd/es/table";
import ImageTable from "@/components/table/ImageTable";
import { useMemo } from "react";
import { resetStatus, setFilter } from "@/services/store/product/product.slice";
import FormSwitch from "@/components/form/FormSwitch";
import PrimaryTable, { ITableData } from "@/components/table/PrimaryTable";
import { Tooltip } from "antd";
import { IoTrashBinOutline } from "react-icons/io5";
import { HiOutlinePencil } from "react-icons/hi";
import useFetchStatus from "@/hooks/useFetchStatus";

// interface IProductTableData {
//   key: string | number;
//   name: string;
// }

const Products = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IProductInitialState>("product");

  const { getAllProductsLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllProducts({ query: { _pagination: false, ...state.filter } })), "getAllProductsLoading"),
    [JSON.stringify(state.filter)],
  );
  useFetchStatus({
    module: "product",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const data: ITableData[] = useMemo(() => {
    return (
      state.products?.map((product) => ({
        key: product.id,
        name: product.name,
        regularPrice: product.regularPrice,
        thumbnail: product.thumbnail,
        brand: product.brand?.name,
        status: product.status,
        stock: product.variants[0].stock,
        variants: product.variants.length,
      })) || []
    );
  }, [state.products]);

  const tableColumns: ColumnsType = [
    {
      title: "Sản phẩm",
      dataIndex: "thumbnail",
      sorter: (a, b) => String(a.product).localeCompare(String(b.product)),
      render: (_, record) => (
        <div className="flex flex-row">
          <ImageTable imageSrc={record.thumbnail} />
          <div className="flex flex-col">
            <span className="capitalize text-black-900"> {record.name}</span>
            <span className="text-[10px] text-[#667085]"> {record.variants} Variants</span>
          </div>
        </div>
      ),
    },
    { dataIndex: "brand", title: " Thương hiệu" },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: (a, b) => Number(a.stock) - Number(b.stock),
    },
    {
      title: "Price",
      dataIndex: "regularPrice",
      sorter: (a, b) => Number(a.price) - Number(b.price),
      render: (price) => <span> {price}.000 VND </span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => String(a.status).localeCompare(String(b.status)),
      render: () => {
        return <FormSwitch />;
      },
    },
    {
      title: " Hành động",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex cursor-pointer gap-3">
          <Tooltip title="View">
            <HiOutlinePencil onClick={() => navigate(`/products/update/${record?.key}`)} className="cursor-pointer text-xl text-yellow-500" />
          </Tooltip>
          <Tooltip title="Delete">
            <IoTrashBinOutline onClick={() => dispatch(deleteProduct({ param: record.key }))} className="text-[18px] text-red-500" />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Heading
        title="Sản phẩm"
        hasBreadcrumb
        buttons={[
          {
            text: "Xuất",
            type: "ghost",
            icon: <GoDownload className="text-[18px]" />,
          },
          {
            text: "Tạo mới Sản phẩm",
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_PERMISSION,
            onClick: () => navigate("/products/create"),
          },
        ]}
      />
      <PrimaryTable
        columns={tableColumns}
        data={data}
        isTableLoading={getAllProductsLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        setFilter={setFilter}
      />
    </>
  );
};

export default Products;
