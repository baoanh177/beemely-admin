import React from "react";
import { Formik, FormikProps } from "formik";
import { object, string } from "yup";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { useArchive } from "@/hooks/useArchive";
import { IBrandInitialState } from "@/services/store/brand/brand.slice";
import { createBrand, updateBrand } from "@/services/store/brand/brand.thunk";
import FormInputArea from "@/components/form/FormInputArea";
import UpdateGrid from "@/components/grid/UpdateGrid";
import UploadImage from "@/components/form/UploadImage";
import { IBrand } from "@/services/store/brand/brand.model";

interface IBrandFormProps {
  FormikRefType?: React.MutableRefObject<FormikProps<IBrand> | null>;
  type: "create" | "update";
  brand?: IBrand;
}

const BrandForm: React.FC<IBrandFormProps> = ({ FormikRefType, type, brand }) => {
  const { dispatch } = useArchive<IBrandInitialState>("brand");

  const initialValues: IBrand = {
    name: brand?.name ?? "",
    image: brand?.image ?? "",
    description: brand?.description ?? "",
  };

  const brandSchema = object().shape({
    name: string().required("Please enter brand name"),
    image: string().required("Please enter image"),
  });

  const handleImageUpload = (imageURL: string | string[]) => {
    const url = Array.isArray(imageURL) ? imageURL[0] : imageURL;
    FormikRefType?.current?.setFieldValue("image", url);
  };

  return (
    <Formik
      innerRef={FormikRefType}
      initialValues={initialValues}
      validationSchema={brandSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createBrand({ body: data }));
        } else if (type === "update" && brand?.id) {
          dispatch(updateBrand({ body: data, param: brand.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <UpdateGrid
          colNumber="2"
          rate="1-3"
          groups={{
            colLeft: (
              <FormGroup title="Thumbnail">
                <UploadImage isMultiple={false} label="Photo" onImageUpload={handleImageUpload} currentImageUrl={values.image} />
              </FormGroup>
            ),
            colRight: (
              <FormGroup title="General information">
                <FormInput
                  label="Brand name"
                  placeholder="Type brand name here..."
                  name="name"
                  value={values.name}
                  error={touched.name ? errors.name : ""}
                  onChange={(e) => setFieldValue("name", e)}
                  onBlur={handleBlur}
                />
                <FormInputArea
                  label="Description"
                  placeholder="Type description here..."
                  name="description"
                  value={values.description}
                  error={touched.description ? errors.description : ""}
                  onChange={(e) => setFieldValue("description", e)}
                />
              </FormGroup>
            ),
          }}
        />
      )}
    </Formik>
  );
};

export default BrandForm;
