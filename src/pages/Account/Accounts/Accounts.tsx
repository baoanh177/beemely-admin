import ManagementGrid from "@/components/grid/ManagementGrid";
import Heading from "@/components/layout/Heading";
import { ITableData } from "@/components/table/PrimaryTable";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IAccountInitialState, resetStatus, setFilter } from "@/services/store/account/account.slice";
import { getAllAccounts } from "@/services/store/account/account.thunk";
import { EPermissions } from "@/shared/enums/permissions";
import { useMemo } from "react";
import { FaPlus } from "react-icons/fa6";
import { getAccountsData, getGridButtons, getColumnsData } from "../data/dataTable";
import useFetchStatus from "@/hooks/useFetchStatus";
import { RootStateType } from "@/services/reducers";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const navigate = useNavigate()
  const { state, dispatch, selector } = useArchive<IAccountInitialState>("account");
  const { profile } = selector((state: RootStateType) => state.auth)

  const { getAllAccountLoading } = useAsyncEffect(
    (async) => {
      async(dispatch(getAllAccounts({ query: state.filter })), "getAllAccountLoading");
    },
    [state.filter],
  );

  const buttons = getGridButtons(dispatch)
  const columns = getColumnsData()
  const accounts: ITableData[] = useMemo(() => getAccountsData(state.accounts, profile!), [state.accounts]);

  useFetchStatus({
    module: "account",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
      },
      error: {
        message: state.message,
      },
    },
  });

  return (
    <>
      <Heading
        title="Tài khoản"
        hasBreadcrumb
        buttons={[
          {
            text: "Tạo mới Tài khoản",
            icon: <FaPlus className="text-[18px]" />,
            onClick() {
              navigate("/accounts/create")
            },
            permission: EPermissions.CREATE_ACCOUNT,
          },
        ]}
      />
      <ManagementGrid
        isTableLoading={getAllAccountLoading}
        columns={columns}
        data={accounts}
        setFilter={setFilter}
        buttons={buttons}
        pagination={{ current: state.filter._page ?? 1, pageSize: state.filter._limit ?? 10, total: state.totalRecords }}
      />
    </>
  );
};

export default Accounts;
