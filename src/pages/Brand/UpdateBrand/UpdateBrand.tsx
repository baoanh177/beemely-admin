import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IBrandInitialState, resetStatus } from "@/services/store/brand/brand.slice";
import { getBrandById } from "@/services/store/brand/brand.thunk";
import { EFetchStatus } from "@/shared/enums/status";
import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import BrandForm from "../BrandForm";
import { IBrand } from "@/services/store/brand/brand.model";
import useAsyncEffect from "@/hooks/useAsyncEffect";

const UpdateBrand = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IBrand>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IBrandInitialState>("brand");

  useFetchStatus({
    module: "brand",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/brands",
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getBrandByIdLoading } = useAsyncEffect(
    (async) => {
      id && async(dispatch(getBrandById({ param: id })), "getBrandByIdLoading");
    },
    [id],
  );

  useEffect(() => {
    if (state.activeBrand && formikRef.current) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeBrand.name,
          image: state.activeBrand.image,
          description: state.activeBrand.description,
        });
      }
    }
  }, [state.activeBrand]);

  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Heading
        title="Cập nhật Thương hiệu"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/brands");
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
      {state.activeBrand && (
        <BrandForm type="update" isFormLoading={getBrandByIdLoading ?? true} FormikRefType={formikRef} brand={state.activeBrand} />
      )}
    </>
  );
};

export default UpdateBrand;
