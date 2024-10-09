import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IAccountInitialState, resetStatus } from "@/services/store/account/account.slice";
import { getAccountById } from "@/services/store/account/account.thunk";
import { EFetchStatus } from "@/shared/enums/status";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import AccountForm from "../AccountForm";
import { useRef } from "react";
import { FormikProps } from "formik";
import { IAccountFormInitialValues } from "../data/dataForm";
import useFetchStatus from "@/hooks/useFetchStatus";
import { CUSTOMER_NAME } from "@/services/config/constants";
import { Modal } from "antd";

const { confirm } = Modal

const UpdateAccount = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IAccountFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IAccountInitialState>("account");
  const isCustomer = state.activeAccount?.roles.every(role => role.name === CUSTOMER_NAME)

  useFetchStatus({ module: "account", reset: resetStatus, actions: {
    error: {
      message: state.message
    },
    success: {
      message: state.message,
      navigate: "/accounts"
    }
  }})

  const { getAccountByIdLoading } = useAsyncEffect((async) => {
    async(dispatch(getAccountById({ param: id })), "getAccountByIdLoading");
  }, []);

  return (
    <>
      <Heading
        title="Cập nhật Tài khoản"
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              confirm({
                title: "Xác nhận",
                content: "Nếu có dữ liệu thay đổi sẽ không được lưu, chắc chắn thoát?",
                onOk: () => {
                  navigate("/accounts");
                },
              });
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Lưu thay đổi",
            icon: <IoSaveOutline className="text-[18px]" />,
            onClick: () => {
              formikRef && formikRef.current && formikRef.current.handleSubmit()
            },
          },
        ]}
        hasBreadcrumb
      />
      <AccountForm
        type="update"
        account={state.activeAccount}
        isFormLoading={getAccountByIdLoading ?? true}
        formikRef={formikRef}
        isCustomer={isCustomer}
      />
    </>
  );
};

export default UpdateAccount;