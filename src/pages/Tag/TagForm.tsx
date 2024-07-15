import { Formik, Form } from "formik";
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
  description: string;
}

const TagForm = ({ formikRef, type, tag }: ITagFormProps) => {
  const { dispatch } = useArchive<ITagInitialState>("tag");

  const initialValues: ITagFormInitialValues = {
    name: tag?.name || "",
    description: tag?.description || "",
  };

  const tagSchema = object().shape({
    name: string().required("Please enter name"),
    description: string().required("Please enter description"),
  });

  return (
    <Formik
      innerRef={formikRef}
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
        <Form>
          <FormGroup title="General information">
            <FormInput
              label="Tag name"
              placeholder="Type name tag here..."
              name="name"
              value={values.name}
              error={touched.name ? errors.name : ""}
              onChange={(e) => setFieldValue("name", e)}
              onBlur={handleBlur}
            />
            <FormInput
              label="Tag description"
              placeholder="Type description tag here..."
              name="description"
              value={values.description}
              error={touched.description ? errors.description : ""}
              onChange={(e) => setFieldValue("description", e)}
              onBlur={handleBlur}
            />
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default TagForm;
