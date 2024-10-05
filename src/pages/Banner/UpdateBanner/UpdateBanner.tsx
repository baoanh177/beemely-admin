import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikProps } from "formik";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import Heading from "@/components/layout/Heading";
import { useArchive } from "@/hooks/useArchive";
import useFetchStatus from "@/hooks/useFetchStatus";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IBannerInitialState, resetStatus } from "@/services/store/banner/banner.slice";
import { getBannerById } from "@/services/store/banner/banner.thunk";
import { EFetchStatus } from "@/shared/enums/status";
import BannerForm, { IBannerFormInitialValues } from "../BannerForm";

const UpdateBanner: React.FC = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IBannerFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IBannerInitialState>("banner");

  useFetchStatus({
    module: "banner",
    reset: resetStatus,
    actions: {
      success: {
        message: state.message,
        navigate: "/banners",
      },
      error: {
        message: state.message,
      },
    },
  });

  const { getBannerByIdLoading } = useAsyncEffect(
    (async) => {
      id && async(dispatch(getBannerById({ param: id })), "getBannerByIdLoading");
    },
    [id],
  );

  useEffect(() => {
    if (state.activeBanner && formikRef.current) {
      formikRef.current.setValues({
        title: state.activeBanner.title,
        imageUrl: state.activeBanner.imageUrl,
        description: state.activeBanner.description,
        path: state.activeBanner.path,
      });
    }
  }, [state.activeBanner]);

  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Heading
        title="Cập nhật Banner"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Quay lại",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/banners");
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
      {state.activeBanner && (
        <BannerForm type="update" isFormLoading={getBannerByIdLoading ?? true} formikRef={formikRef} banner={state.activeBanner} />
      )}
    </>
  );
};

export default UpdateBanner;
