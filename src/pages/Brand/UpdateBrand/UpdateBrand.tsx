import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IBrandInitialState, resetStatus } from "@/services/store/brand/brand.slice";
import { getBrandById } from "@/services/store/brand/brand.thunk";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { FormikProps } from "formik";
import { useEffect, useRef } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import BrandForm from "../BrandForm";
import { IBrand } from "@/services/store/brand/brand.model";

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

  useEffect(() => {
    if (id) {
      dispatch(getBrandById(id));
    }
  }, [id]);

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
        title="Cập nhật Brand"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Huỷ",
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
      {state.activeBrand && <BrandForm type="update" FormikRefType={formikRef} brand={state.activeBrand} />}
    </>
  );
};

export default UpdateBrand;
