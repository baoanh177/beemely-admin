import { useArchive } from "@/hooks/useArchive";
import { IlabelInitialState } from "@/services/store/label/label.slice";
import { createLabel, updateLabel } from "@/services/store/label/label.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";
import lodash from "lodash";
import UpdateGrid from "@/components/grid/UpdateGrid";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";

interface ILabelFormProps {
  formikRef?: FormikRefType<ILabelFormInitialValues>;
  type: "create" | "update";
  label?: ILabelFormInitialValues;
}

export interface ILabelFormInitialValues {
  id?: string;
  name: string;
  description: string;
}

const LabelForm = ({ formikRef, type, label }: ILabelFormProps) => {
  const { dispatch } = useArchive<IlabelInitialState>("label");

  const initialValues: ILabelFormInitialValues = {
    name: label?.name || "",
    description: label?.description || "",
  };

  const labelSchema = object().shape({
    name: string().required("Please enter name"),
    description: string().required("Please enter description"),
  });
  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={labelSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createLabel({ body: lodash.omit(data, "id") }));
        } else if (type === "update" && label?.id) {
          dispatch(updateLabel({ body: lodash.omit(data, "id"), param: label.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <UpdateGrid
          colNumber="1"
          rate="1"
          groups={{
            colLeft: (
              <FormGroup title="General information">
                <FormInput
                  label="Label name"
                  placeholder="Type name label here..."
                  name="name"
                  value={values.name}
                  error={touched.name ? errors.name : ""}
                  onChange={(e) => setFieldValue("name", e)}
                  onBlur={handleBlur}
                />
                <FormInput
                  label="Label description"
                  placeholder="Type description label here..."
                  name="description"
                  value={values.description}
                  error={touched.description ? errors.description : ""}
                  onChange={(e) => setFieldValue("description", e)}
                  onBlur={handleBlur}
                />
              </FormGroup>
            ),
          }}
        />
      )}
    </Formik>
  );
};

export default LabelForm;