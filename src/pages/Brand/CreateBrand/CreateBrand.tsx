import { useRef, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BrandForm, { IBrandFormInitialValues } from "../BrandForm";
import { FormikProps } from "formik";
import Heading from "@/components/layout/Heading";
import useFetchStatus from "@/hooks/useFetchStatus";
import { IBrandInitialState, resetStatus } from "@/services/store/brand/brand.slice";
import { useArchive } from "@/hooks/useArchive";
import { createBrand } from "@/services/store/brand/brand.thunk";
import UploadImage from "@/components/form/UploadImage";
import UpdateGrid from "@/components/grid/UpdateGrid";

const CreateBrand = () => {
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<IBrandFormInitialValues>>(null);
  const { state, dispatch } = useArchive<IBrandInitialState>("brand");
  const [imageURL, setImageURL] = useState<string>("");

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

  const handleImageUpload = (url: string) => {
    setImageURL(url);
  };

  useEffect(() => {
    if (imageURL !== "") {
      handleSubmit();
    }
  }, [imageURL]);

  const handleSubmit = async () => {
    try {
      if (formikRef.current) {
        formikRef.current.handleSubmit();
        const formData = {
          name: formikRef.current.values.name,
          image: imageURL,
          description: formikRef.current.values.description,
        };
        dispatch(createBrand({ body: formData }));
      }
    } catch (error) {}
  };

  return (
    <>
      <Heading
        title="Create Brand"
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
            text: "Create Brand",
            icon: <FaPlus className="text-[18px]" />,
            onClick: handleSubmit,
          },
        ]}
      />
      <UpdateGrid
        colNumber="2"
        rate="1-3"
        groups={{
          colLeft: <UploadImage label="Add Image" isMultiple={false} text="Photo" title="Thumbnail" onImageUpload={handleImageUpload} />,
          colRight: <BrandForm type="create" formikRef={formikRef} />,
        }}
      />
    </>
  );
};

export default CreateBrand;
