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
import UpdateImage from "@/components/form/FormUpload";

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
      <div className="flex w-full justify-between gap-6">
        <UpdateImage lable="Add Image" isMultiple={false} text="Photo" title="Thumbnail" onImageUpload={handleImageUpload} />
        <div className="w-3/4">
          <BrandForm type="create" formikRef={formikRef} />
        </div>
      </div>
    </>
  );
};

export default CreateBrand;
