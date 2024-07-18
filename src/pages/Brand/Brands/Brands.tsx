import { useEffect, useMemo } from "react";
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

  useEffect(() => {
    dispatch(getAllBrands({ query: state.filter }));
  }, [JSON.stringify(state.filter)]);

  const columns: ColumnsType<ITableData> = [
    {
      dataIndex: "name",
      title: "Name",
    },
    {
      dataIndex: "image",
      title: "Image",
      render: (image: string) => <img src={image} alt="Brand" className="h-11 w-11 rounded-xl" />,
    },
    {
      dataIndex: "description",
      title: "Description",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.brands && state.brands.length > 0) {
      return state.brands.map((brand) => ({
        key: brand.id,
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
        title="Brands"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_BRAND,
            text: "Create Brand",
            onClick: () => navigate("/brands/create"),
          },
        ]}
      />
      <ManagementGrid columns={columns} data={data} setFilter={setFilter} search={{ status: [] }} buttons={buttons} />
    </>
  );
};

export default Brands;
