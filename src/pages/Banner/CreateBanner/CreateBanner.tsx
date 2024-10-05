import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BannerForm from "../BannerForm";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/status";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IBannerInitialState, resetStatus } from "@/services/store/banner/banner.slice";
import { IBanner } from "@/services/store/banner/banner.model";
import { useArchive } from "@/hooks/useArchive";
import { FormikProps } from "formik";

const CreateBanner = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IBanner>>(null);
  const { state } = useArchive<IBannerInitialState>("banner");

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

  const handleSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Heading
        title="Tạo mới Banner"
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
            text: "Tạo mới Banner",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <BannerForm type="create" formikRef={formikRef} />
    </>
  );
};

export default CreateBanner;
