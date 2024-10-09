import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IAccountInitialState } from "@/services/store/account/account.slice";
import { getAccountById } from "@/services/store/account/account.thunk";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import AccountForm from "../AccountForm";
import { CUSTOMER_NAME } from "@/services/config/constants";

const DetailAccount = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, dispatch } = useArchive<IAccountInitialState>("account");
  const isCustomer = state.activeAccount?.roles.every(role => role.name === CUSTOMER_NAME)

  const { getAccountByIdLoading } = useAsyncEffect((async) => {
    async(dispatch(getAccountById({ param: id })), "getAccountByIdLoading");
  }, []);

  return (
    <>
      <Heading
        title="Chi tiết Tài khoản"
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/accounts");
            },
          },
        ]}
        hasBreadcrumb
      />
      <AccountForm
        type="view"
        account={state.activeAccount}
        isFormLoading={getAccountByIdLoading ?? true}
        isCustomer={isCustomer}
      />
    </>
  );
};

export default DetailAccount;