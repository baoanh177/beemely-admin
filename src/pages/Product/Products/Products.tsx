import StatusBadge from "@/components/common/StatusBadge";
import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
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
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getGridButtons } from "../utils/dataTable";

const Products = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IProductInitialState>("product");
  const defaultSearch: IDefaultSearchProps = {
    filterOptions: {
      name: "status",
      options: [
        { label: "Kích hoạt", value: String(EActiveStatus.ACTIVE) },
        { label: "Chưa kích hoạt", value: String(EActiveStatus.INACTIVE) },
      ],
      onChange: (selectedOption) => {
        const statusValue = selectedOption.value;
        dispatch(setFilter({ ...state.filter, status: statusValue }));
      },
    },
    input: {
      type: "text",
      name: "name",
      icon: IoSearchOutline,
      onChange: (value) => {
        dispatch(setFilter({ ...state.filter, name: value }));
      },
      placeholder: "Tìm kiếm theo tên. . .",
    },
  };

  useFetchStatus({
    module: "product",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllProductsLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllProducts({ query: { _pagination: false, ...state.filter } })), "getAllProductsLoading"),
    [JSON.stringify(state.filter)],
  );
  const data: ITableData[] = useMemo(() => {
    return (
      state.products?.map((product) => {
        let minPrice = Infinity;
        let maxPrice = -Infinity;
        return {
          key: product.id,
          name: product.name,
          thumbnail: product.thumbnail,
          brand: product.brand?.name,
          status: product.status,
          stock: product.variants.reduce((acc, v) => acc + v.stock, 0),
          price: product.variants[0]?.price,
          discountPrice: product.variants[0].discountPrice,
          variants: product.variants.length,
          productBody: product,
          variantsBody: product.variants.map((v) => {
            minPrice = Math.min(v.discountPrice, minPrice);
            maxPrice = Math.max(v.discountPrice, maxPrice);
            if (minPrice === maxPrice) {
              return { minPrice: 0, maxPrice };
            }
            return {
              minPrice,
              maxPrice,
            };
          }),
        };
      }) || []
    );
  }, [state.products]);

  const tableColumns: any = [
    {
      title: "Sản phẩm",
      dataIndex: "thumbnail",
      sorter: (a: any, b: any) => String(a.product).localeCompare(String(b.product)),
      render: (_: any, record: any) => (
        <div className="flex flex-col gap-1 md:flex-row">
          <ImageTable imageSrc={record.thumbnail} />
          <div className="flex flex-col">
            <span className="truncate capitalize text-black-900"> {record.name}</span>
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
      render: (stock: number) => <span>{stock}</span>,
    },
    {
      title: "Price",
      dataIndex: "variantsBody",
      sorter: (a: any, b: any) =>
        Number(a.variantsBody[a.variantsBody.length - 1].maxPrice) - Number(b.variantsBody[b.variantsBody.length - 1].maxPrice),
      render: (_: any, variant: any) => (
        <span>
          {" "}
          {variant.variantsBody[variant.variantsBody.length - 1].minPrice === 0
            ? ""
            : variant.variantsBody[variant.variantsBody.length - 1].minPrice.toLocaleString() + " VND - "}
          {variant.variantsBody[variant.variantsBody.length - 1].maxPrice.toLocaleString()} VND
        </span>
      ),
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
      <ManagementGrid
        isTableLoading={getAllProductsLoading}
        columns={tableColumns}
        data={data}
        search={defaultSearch}
        setFilter={setFilter}
        buttons={buttons}
        pagination={{ current: state.filter._page ?? 1, pageSize: state.filter._limit ?? 10, total: state.totalRecords }}
      />
    </>
  );
};

export default Products;
