import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { IDefaultSearchProps } from "@/components/search/DefaultSearch";
import ImageTable from "@/components/table/ImageTable";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IGenderInitialState, setFilter, resetStatus } from "@/services/store/gender/gender.slice";
import { deleteGender, getAllGenders } from "@/services/store/gender/gender.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Genders = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IGenderInitialState>("gender");
  const defaultSearch: IDefaultSearchProps = {
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
    module: "gender",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  const { getAllGendersLoading } = useAsyncEffect(
    (async) => async(dispatch(getAllGenders({ query: state.filter })), "getAllGendersLoading"),
    [JSON.stringify(state.filter)],
  );

  const columns: ColumnsType = [
    {
      dataIndex: "name",
      title: "Tên",
    },
    {
      dataIndex: "slug",
      title: "Slug",
    },
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      render: (imageUrl) => {
        return <ImageTable imageSrc={imageUrl} />;
      },
    },
    {
      dataIndex: "path",
      title: "Đường dẫn chuyển hướng",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.genders && state.genders.length > 0) {
      return state.genders.map((gender) => ({
        key: gender.id ?? "default-key",
        name: gender.name,
        slug: gender.slug,
        imageUrl: gender.imageUrl,
        path: gender.path,
      }));
    }
    return [];
  }, [state.genders]);

  const buttons: IGridButton[] = [
    {
      type: EButtonTypes.UPDATE,
      onClick(record) {
        navigate(`/genders/update/${record?.key}`);
      },
      permission: EPermissions.UPDATE_GENDER,
    },
    {
      type: EButtonTypes.DELETE,
      onClick(record) {
        dispatch(deleteGender({ param: record.key }));
      },
      permission: EPermissions.DELETE_GENDER,
    },
  ];

  return (
    <>
      <Heading
        title="Giới tính"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_GENDER,
            text: "Tạo mới Giới tính",
            onClick: () => navigate("/genders/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        isTableLoading={getAllGendersLoading ?? true}
        pagination={{ current: state.filter._page!, pageSize: state.filter._limit!, total: state.totalRecords }}
        setFilter={setFilter}
        buttons={buttons}
        search={defaultSearch}
      />
    </>
  );
};

export default Genders;
