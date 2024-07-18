import { useEffect, useRef, useState } from "react";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import BrandForm, { IBrandFormInitialValues } from "../BrandForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IBrandInitialState, resetStatus } from "@/services/store/brand/brand.slice";
import { useArchive } from "@/hooks/useArchive";
import { getBrandById, updateBrand } from "@/services/store/brand/brand.thunk";
import UpdateImage from "@/components/form/FormUpload";

const UpdateBrand = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IBrandFormInitialValues>>(null);
  const { id } = useParams();
  const { state, dispatch } = useArchive<IBrandInitialState>("brand");
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");

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
    if (state.activeBrand) {
      if (formikRef.current) {
        formikRef.current.setValues({
          name: state.activeBrand.name,
          image: state.activeBrand.image,
          description: state.activeBrand.description,
        });
        setCurrentImageUrl(state.activeBrand.image);
      }
    }
  }, [state.activeBrand]);

  const handleImageUpload = async (url: string) => {
    setCurrentImageUrl(url);
  };

  const handleSubmit = () => {
    if (formikRef.current) {
      const updatedValues = {
        ...formikRef.current.values,
        image: currentImageUrl,
      };
      dispatch(updateBrand({ body: updatedValues, param: id }));
    }
  };

  return (
    <>
      <Heading
        title="Update Brand"
        hasBreadcrumb
        buttons={[
          {
            type: "secondary",
            text: "Cancel",
            icon: <IoClose className="text-[18px]" />,
            onClick: () => {
              navigate("/brands");
            },
          },
          {
            isLoading: state.status === EFetchStatus.PENDING,
            text: "Save changes",
            icon: <IoSaveOutline className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <div className="flex w-full justify-between gap-6">
        <UpdateImage
          lable="Change Image"
          isMultiple={false}
          text="Photo"
          title="Thumbnail"
          onImageUpload={handleImageUpload}
          currentImageUrl={currentImageUrl}
        />
        <div className="w-3/4">{state.activeBrand && <BrandForm type="update" formikRef={formikRef} brand={state.activeBrand} />}</div>
      </div>
    </>
  );
};

export default UpdateBrand;
