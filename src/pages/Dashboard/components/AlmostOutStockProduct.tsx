import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import ManagementGrid from "@/components/grid/ManagementGrid";
import ImageTable from "@/components/table/ImageTable";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IProduct } from "@/services/store/product/product.model";
import { IStatsInitialState, setFilter } from "@/services/store/stats/stats.slice";
import { getAlmostOutStockProduct } from "@/services/store/stats/stats.thunk";
import { IVariant } from "@/services/store/variant/variant.model";
import { ColumnsType } from "antd/es/table";
import { EButtonTypes } from "@/shared/enums/button";
import { IGridButton } from "@/shared/utils/shared-interfaces";

const AlmostOutStockProduct = () => {
  const { state, dispatch } = useArchive<IStatsInitialState>("stats");
  const navigate = useNavigate();
  const { getAlmostOutStockProductLoading } = useAsyncEffect(
    (async) =>
      async(
        dispatch(getAlmostOutStockProduct({ query: { _pagination: false, ...state.filter, _limit: 10 } })),
        "getAlmostOutStockProductLoading",
      ),
    [JSON.stringify(state.filter)],
  );

  const formatedProduct: IProduct[] = useMemo(
    () =>
      [...state.products].map((prod) => ({
        ...prod,
        variants: prod.variants.filter((va) => va.stock <= 10),
      })),
    [state.products],
  );

  const data: ITableData[] = useMemo(() => {
    if (!formatedProduct || !formatedProduct.length) {
      return [];
    }
    return formatedProduct.map((item) => ({
      id: item.id,
      key: item.id,
      variants: item.variants,
      product: item,
    }));
  }, [formatedProduct]);

  const columns: ColumnsType<any> = [
    {
      dataIndex: "product",
      title: "Sản phẩm",
      render: (product: any) => (
        <div className="flex flex-row gap-4">
          <ImageTable imageSrc={product.thumbnail} />
          <Link to={`/products/update/${product.id}`} className="line-clamp-1">
            {product.name}
          </Link>
        </div>
      ),
    },
    {
      dataIndex: "variants",
      title: "Biến thể",
      render: (variants: IVariant[]) => (
        <div className="flex flex-col gap-2">
          {variants.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span>Màu:</span> <span className="block h-4 w-4 rounded-full border" style={{ backgroundColor: item.color?.value }} />
              </div>
              <div className="flex items-center gap-2">
                <span>Cỡ:</span> <span>{item.size.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Kho:</span> <span className="block rounded-3xl bg-red-200 px-3 py-[2px] text-sm text-red-600">{item.stock}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/products/update/${record?.key}`);
      },
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="font-bold">Các sản phẩm có tồn kho ít nhất</div>
      <ManagementGrid
        columns={columns}
        isTableLoading={getAlmostOutStockProductLoading}
        data={data}
        setFilter={setFilter}
        search={{}}
        buttons={buttons}
      />
    </div>
  );
};

export default AlmostOutStockProduct;
