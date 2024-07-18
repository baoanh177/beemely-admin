import { Formik, Form } from "formik";
import { object, string } from "yup";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { useArchive } from "@/hooks/useArchive";
import { IBrandInitialState } from "@/services/store/brand/brand.slice";
import { createBrand, updateBrand } from "@/services/store/brand/brand.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import FormInputArea from "@/components/form/FormInputArea";

interface IBrandFormProps {
  formikRef?: FormikRefType<IBrandFormInitialValues>;
  type: "create" | "update";
  brand?: IBrandFormInitialValues;
}

export interface IBrandFormInitialValues {
  id?: string;
  name: string;
  image: string;
  description: string;
}

const BrandForm = ({ formikRef, type, brand }: IBrandFormProps) => {
  const { dispatch } = useArchive<IBrandInitialState>("brand");

  const initialValues: IBrandFormInitialValues = {
    name: brand?.name || "",
    image: brand?.image || "",
    description: brand?.description || "",
  };

  const brandSchema = object().shape({
    name: string().required("Please enter name"),
    image: string().required("Please enter image URL"),
    description: string().required("Please enter description"),
  });

  return (
    <Formik
      innerRef={formikRef}
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
        <Form>
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
        </Form>
      )}
    </Formik>
  );
};

export default BrandForm;
