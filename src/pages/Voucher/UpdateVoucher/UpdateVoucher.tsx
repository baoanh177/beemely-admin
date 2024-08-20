import { useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import VoucherForm, { IVoucherFormInitialValues } from "../VoucherForm";
import { IVoucherInitialState, resetStatus } from "@/services/store/voucher/voucher.slice";
import { getVoucherById } from "@/services/store/voucher/voucher.thunk";
const UpdateVoucher = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IVoucherFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IVoucherInitialState>("voucher");

  useFetchStatus({
    module: "voucher",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/vouchers",
      },
      error: {
        message: state.message,
      },
    },
  });
  const { getVoucherByIdLoading } = useAsyncEffect(
    (async) => id && async(dispatch(getVoucherById({ param: id })), "getVoucherByIdLoading"),
    [id],
  );
  return (
    <>
      <Heading
        title="Cập nhật Mã giảm giá"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/vouchers");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Lưu thay đổi",
            icon: <IoSaveOutline className="text-[18px]" />,
            onClick: () => {
              if (formikRef.current) {
                formikRef.current.handleSubmit();
              }
            },
          },
        ]}
      />
      {state.activeVoucher && (
        <VoucherForm type="update" isFormLoading={getVoucherByIdLoading ?? true} formikRef={formikRef} voucher={state.activeVoucher} />
      )}
    </>
  );
};

export default UpdateVoucher;
