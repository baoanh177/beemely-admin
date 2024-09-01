import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import { IProductTypeInitialState, resetStatus } from "@/services/store/productType/productType.slice";
import { EFetchStatus } from "@/shared/enums/status";
import { FormikProps } from "formik";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import ProductTypeForm, { IProductTypeFormInitialValues } from "../ProductTypeForm";
import useFetchStatus from "@/hooks/useFetchStatus";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { getProductTypeById } from "@/services/store/productType/productType.thunk";

const UpdateProductType = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IProductTypeFormInitialValues>>(null);
  const { state, dispatch } = useArchive<IProductTypeInitialState>("productType");
  useFetchStatus({
    module: "productType",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/product-types",
      },
      error: {
        message: state.message,
      },
    },
  });
  const { id } = useParams();
  const { getProductTypeByIdLoading } = useAsyncEffect(
    (async) => id && async(dispatch(getProductTypeById({ param: id })), "getProductTypeByIdLoading"),
    [id],
  );

  useEffect(() => {
    if (state.activeProductType) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeProductType.name,
        });
      }
    }
  }, [state.activeProductType]);
  return (
    <div>
      <Heading
        title="Cập nhật Trạng thái đơn hàng"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/order-statuses");
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
      {state.activeProductType && (
        <ProductTypeForm
          type="update"
          isFormLoading={getProductTypeByIdLoading ?? true}
          formikRef={formikRef}
          productType={state.activeProductType}
        />
      )}
    </div>
  );
};

export default UpdateProductType;
