import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import Heading from "@/components/layout/Heading";
import ManagementGrid from "@/components/grid/ManagementGrid";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IBrandInitialState, resetStatus, setFilter } from "@/services/store/brand/brand.slice";
import { deleteBrand, getAllBrands } from "@/services/store/brand/brand.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import ImageTable from "@/components/table/ImageTable";
import useAsyncEffect from "@/hooks/useAsyncEffect";

const Brands = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IBrandInitialState>("brand");

  useFetchStatus({
    module: "brand",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllBrandsLoading } = useAsyncEffect(
    (async) => {
      async(dispatch(getAllBrands({ query: state.filter })), "getAllBrandsLoading");
    },
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType<ITableData> = [
    {
      title: "Tên",
      render: (record) => <ImageTable title={record?.name} imageSrc={record?.image} />,
    },
    {
      dataIndex: "description",
      title: "Mô tả",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (Array.isArray(state.brands)) {
      return state.brands
        .filter((brand) => brand.id)
        .map((brand) => ({
          key: brand.id ?? "default-key",
          name: brand.name,
          image: brand.image,
          description: brand.description,
        }));
    }
    return [];
  }, [state.brands]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/brands/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_BRAND,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteBrand(record.key));
      },
      permission: EPermissions.DELETE_BRAND,
    },
  ];

  return (
    <>
      <Heading
        title="Thương hiệu"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_BRAND,
            text: "Tạo mới Thương hiệu",
            onClick: () => navigate("/brands/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllBrandsLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._size!, total: state.totalRecords }}
        setFilter={setFilter}
        search={{ status: [] }}
        buttons={buttons}
      />
    </>
  );
};

export default Brands;
