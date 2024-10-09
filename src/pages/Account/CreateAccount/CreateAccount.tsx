import Heading from "@/components/layout/Heading";
import { FormikProps } from "formik";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AccountForm from "../AccountForm";
import { IAccountFormInitialValues } from "../data/dataForm";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IAccountInitialState, resetStatus } from "@/services/store/account/account.slice";
import { useArchive } from "@/hooks/useArchive";

const CreateAccount = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IAccountFormInitialValues>>(null);
  const { state } = useArchive<IAccountInitialState>("account")

  useFetchStatus({ module: "account", reset: resetStatus, actions: {
    error: {
      message: state.message
    },
    success: {
      message: state.message,
      navigate: "/accounts"
    }
  }})

  return (
    <>
      <Heading
        title="Tạo mới Tài khoản"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/accounts");
            },
          },
          {
            text: "Tạo mới Tài khoản",
            icon: <FaPlus className="text-[18px]" />,
            onClick() {
              formikRef && formikRef.current && formikRef.current.handleSubmit();
            },
          },
        ]}
      />
      <AccountForm formikRef={formikRef} type="create" />
    </>
  );
};

export default CreateAccount;
