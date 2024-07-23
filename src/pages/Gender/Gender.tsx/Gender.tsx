import { useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import Heading from "@/components/layout/Heading";
import ManagementGrid from "@/components/grid/ManagementGrid";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IGenderInitialState, resetStatus, setFilter } from "@/services/store/gender/gender.slice";
import { deleteGender, getAllGenders } from "@/services/store/gender/gender.thunk";
import { EButtonTypes } from "@/shared/enums/button";
import { EPermissions } from "@/shared/enums/permissions";
import { IGridButton } from "@/shared/utils/shared-interfaces";

const Genders = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useArchive<IGenderInitialState>("gender");
  useFetchStatus({
    module: "gender",
    reset: resetStatus,
    actions: {
      success: { message: state.message },
      error: { message: state.message },
    },
  });

  useEffect(() => {
    dispatch(getAllGenders({ query: state.filter }));
  }, [JSON.stringify(state.filter)]);

  const columns: ColumnsType<ITableData> = [
    {
      dataIndex: "name",
      title: "Tên",
    },
  ];

  const data: ITableData[] = useMemo(() => {
    if (state.genders && state.genders.length > 0) {
      return state.genders.map((gender) => ({
        key: gender.id,
        name: gender.name,
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
        dispatch(deleteGender(record.key));
      },
      permission: EPermissions.DELETE_GENDER,
    },
  ];

  return (
    <>
      <Heading
        title="Genders"
        hasBreadcrumb
        buttons={[
          {
            icon: <FaPlus className="text-[18px]" />,
            permission: EPermissions.CREATE_GENDER,
            text: "Tạo mới Gender",
            onClick: () => navigate("/genders/create"),
          },
        ]}
      />
      <ManagementGrid
        columns={columns}
        data={data}
        pagination={{ current: state.filter._page!, pageSize: state.filter._size!, total: state.totalRecords }}
        setFilter={setFilter}
        search={{ status: [] }}
        buttons={buttons}
      />
    </>
  );
};

export default Genders;
