import { Formik } from "formik";
import { object, string } from "yup";
import lodash from "lodash";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { useArchive } from "@/hooks/useArchive";
import { ITagInitialState } from "@/services/store/tag/tag.slice";
import { createTag, updateTag } from "@/services/store/tag/tag.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";

interface ITagFormProps {
  formikRef?: FormikRefType<ITagFormInitialValues>;
  type: "create" | "update";
  tag?: ITagFormInitialValues;
}

export interface ITagFormInitialValues {
  id?: string;
  name: string;
  description?: string;
}

const TagForm = ({ formikRef, type, tag }: ITagFormProps) => {
  const { dispatch } = useArchive<ITagInitialState>("tag");

  const initialValues: ITagFormInitialValues = {
    name: tag?.name || "",
    description: tag?.description || "",
  };

  const tagSchema = object().shape({
    name: string().required("Vui lòng nhập tên Tag"),
  });

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={tagSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createTag({ body: lodash.omit(data, "id") }));
        } else if (type === "update" && tag?.id) {
          dispatch(updateTag({ body: lodash.omit(data, "id"), param: tag.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung">
          <FormInput
            label="Tên tag"
            placeholder="Nhập tên tag ở đây..."
            name="name"
            value={values.name}
            error={touched.name ? errors.name : ""}
            onChange={(e) => setFieldValue("name", e)}
            onBlur={handleBlur}
          />
          <FormInput
            label="Mô tả tag"
            placeholder="Nhập mô tả tag ở đây..."
            name="description"
            value={values.description}
            error={touched.description ? errors.description : ""}
            onChange={(e) => setFieldValue("description", e)}
            onBlur={handleBlur}
          />
        </FormGroup>
      )}
    </Formik>
  );
};

export default TagForm;
