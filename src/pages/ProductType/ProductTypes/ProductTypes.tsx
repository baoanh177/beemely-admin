import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import ImageTable from "@/components/table/ImageTable";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IProductTypeInitialState, resetStatus, setFilter } from "@/services/store/productType/productType.slice";
import { deleteProductType, getAllProductTypes } from "@/services/store/productType/productType.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductTypes = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IProductTypeInitialState>("productType");
  const { getAllProductTypesLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllProductTypes({ query: state.filter })), "getAllProductTypesLoading"),
    [JSON.stringify(state.filter)],
  );

  useFetchStatus({
    module: "productType",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });
  const columns: ColumnsType = [
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      render: (imageUrl) => {
        return <ImageTable imageSrc={imageUrl} />;
      },
    },
    {
      dataIndex: "name",
      title: "Tên",
    },
    {
      dataIndex: "slug",
      title: "Slug",
    },
  ];
  const data: ITableData[] = useMemo(() => {
    if (state.productTypes && state.productTypes.length > 0) {
      return state.productTypes.map((productType) => ({
        key: productType.id,
        name: productType.name,
        imageUrl: productType.imageUrl,
        slug: productType.slug,
      }));
    }
    return [];
  }, [state.productTypes]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/product-types/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_PRODUCT_TYPE,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteProductType({ param: record.key }));
      },
      permission: EPermissions.DELETE_PRODUCT_TYPE,
    },
  ];

  return (
    <>
      <Heading
        title="Loại sản phẩm"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_PRODUCT_TYPE,
            text: "Tạo mới loại sản phẩm ",
            onClick: () => navigate("/product-types/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllProductTypesLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        buttons={buttons}
        setFilter={setFilter}
      />
    </>
  );
};

export default ProductTypes;
