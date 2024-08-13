import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import VoucherTypeForm, { IVoucherTypeFormInitialValues } from "../VoucherTypeForm";
import { getVoucherTypeByid } from "@/services/store/voucherType/voucherType.thunk";
import { IVoucherTypeInitialState, resetStatus } from "@/services/store/voucherType/voucherType.slice";

const UpdateVoucherType = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IVoucherTypeFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IVoucherTypeInitialState>("voucherType");
  useFetchStatus({
    module: "voucherType",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/voucherTypes",
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getVoucherTypeByIdLoading } = useAsyncEffect(
    (async) => id && async(dispatch(getVoucherTypeByid(id)), "getVoucherTypeByIdLoading"),
    [id],
  );

  useEffect(() => {
    if (state.activeVoucherType) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeVoucherType.name,
        });
      }
    }
  }, [state.activeVoucherType]);

  return (
    <>
      <Heading
        title="Cập nhật Loại mã giảm giá"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/voucherTypes");
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
      {state.activeVoucherType && (
        <VoucherTypeForm
          type="update"
          isFormLoading={getVoucherTypeByIdLoading ?? true}
          formikRef={formikRef}
          voucherType={state.activeVoucherType}
        />
      )}
    </>
  );
};

export default UpdateVoucherType;
