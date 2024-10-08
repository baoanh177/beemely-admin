import StatusBadge from "@/components/common/StatusBadge";
import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import ImageTable from "@/components/table/ImageTable";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IProductInitialState } from "@/services/store/product/product.model";
import { resetStatus, setFilter } from "@/services/store/product/product.slice";
import { getAllProducts } from "@/services/store/product/product.thunk";
import { EPermissions } from "@/shared/enums/permissions";
import { EActiveStatus, EStatusName } from "@/shared/enums/status";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { getGridButtons } from "../utils/dataTable";

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
        productBody: product,
        variantsBody: product.variants.map((v) => ({
          id: v.id,
          color: v.color?.id,
          size: v.size.id,
          price: v.price,
          stock: v.stock,
        })),
      })) || []
    );
  }, [state.products]);

  const tableColumns: any = [
    {
      title: "Sản phẩm",
      dataIndex: "thumbnail",
      sorter: (a: any, b: any) => String(a.product).localeCompare(String(b.product)),
      render: (_: any, record: any) => (
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
      sorter: (a: any, b: any) => Number(a.stock) - Number(b.stock),
    },
    {
      title: "Price",
      dataIndex: "regularPrice",
      sorter: (a: any, b: any) => Number(a.price) - Number(b.price),
      render: (price: any) => <span> {price}.000 VND </span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a: any, b: any) => String(a.status).localeCompare(String(b.status)),
      render: (_: any, record: any) => {
        return record.status === EActiveStatus.ACTIVE ? (
          <StatusBadge text={EStatusName.ACTIVE} color="green" />
        ) : (
          <StatusBadge text={EStatusName.INACTIVE} color="red" />
        );
      },
    },
  ];

  const buttons = getGridButtons(dispatch);
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
      {/* <PrimaryTable
        columns={tableColumns}
        data={data}
        button={buttons}
        isTableLoading={getAllProductsLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        setFilter={setFilter}
      /> */}
      <ManagementGrid
        isTableLoading={getAllProductsLoading}
        columns={tableColumns}
        data={data}
        setFilter={setFilter}
        buttons={buttons}
        pagination={{ current: state.filter._page ?? 1, pageSize: state.filter._limit ?? 10, total: state.totalRecords }}
      />
    </>
  );
};

export default Products;
