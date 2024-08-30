import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { useArchive } from "@/hooks/useArchive";
import { ICategoryInitialState } from "@/services/store/category/category.slice";
import { createCategory, updateCategory } from "@/services/store/category/category.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";

interface ICategoryFormProps {
  formikRef?: FormikRefType<ICategoryFormInitialValues>;
  type: "create" | "update";
  category?: ICategoryFormInitialValues;
  isFormLoading?: boolean;
}

export interface ICategoryFormInitialValues {
  id?: string;
  name: string;
}

const CategoryForm = ({ formikRef, type, category, isFormLoading = false }: ICategoryFormProps) => {
  const { dispatch } = useArchive<ICategoryInitialState>("category");
  const initialValues: ICategoryFormInitialValues = {
    name: category?.name || "",
  };

  const categorySchema = object().shape({
    name: string().required("Vui lòng nhập tên danh mục"),
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={categorySchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createCategory({ body: data }));
        } else if (type === "update" && category?.id) {
          dispatch(updateCategory({ body: data, param: category.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
          <FormInput
            label="Tên danh mục"
            placeholder="Nhập tên danh mục ở đây..."
            name="name"
            value={values.name}
            error={touched.name ? errors.name : ""}
            onChange={(e) => setFieldValue("name", e)}
            onBlur={handleBlur}
          />
        </FormGroup>
      )}
    </Formik>
  );
};

export default CategoryForm;
