import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { EFetchStatus } from "@/shared/enums/status";
import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IShippingMethod } from "@/services/store/shippingMethod/shippingMethod.model";
import { IShippingMethodInitialState, resetStatus } from "@/services/store/shippingMethod/shippingMethod.slice";
import { getShippingMethodById } from "@/services/store/shippingMethod/shippingMethod.thunk";
import ShippingMethodForm from "../ShippingMethodForm";

const UpdateShippingMethod = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IShippingMethod>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IShippingMethodInitialState>("shippingMethod");

  useFetchStatus({
    module: "shippingMethod",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/shipping-methods",
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getShippingMethodByIdLoading } = useAsyncEffect(
    (async) => {
      id && async(dispatch(getShippingMethodById({ param: id })), "getShippingMethodByIdLoading");
    },
    [id],
  );

  useEffect(() => {
    if (state.activeShippingMethod && formikRef.current) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeShippingMethod.name,
          cost: state.activeShippingMethod.cost,
          estimatedDeliveryTime: state.activeShippingMethod.estimatedDeliveryTime,
        });
      }
    }
  }, [state.activeShippingMethod]);

  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Heading
        title="Cập nhật Phương thức vận chuyển"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/shipping-methods");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Lưu thay đổi",
            icon: <IoSaveOutline className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      {state.activeShippingMethod && (
        <ShippingMethodForm
          type="update"
          isFormLoading={getShippingMethodByIdLoading ?? true}
          FormikRefType={formikRef}
          shippingMethod={state.activeShippingMethod}
        />
      )}
    </>
  );
};

export default UpdateShippingMethod;
