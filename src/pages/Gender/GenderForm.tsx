import { Formik } from "formik";
import { object, string } from "yup";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { useArchive } from "@/hooks/useArchive";
import { IGenderInitialState } from "@/services/store/gender/gender.slice";
import { createGender, updateGender } from "@/services/store/gender/gender.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import UpdateGrid from "@/components/grid/UpdateGrid";

interface IGenderFormProps {
  formikRef?: FormikRefType<IGenderFormInitialValues>;
  type: "create" | "update";
  gender?: IGenderFormInitialValues;
  isLoading?: boolean;
}

export interface IGenderFormInitialValues {
  id?: string;
  name: string;
}

const GenderForm = ({ formikRef, type, gender, isLoading }: IGenderFormProps) => {
  const { dispatch } = useArchive<IGenderInitialState>("gender");
  const initialValues: IGenderFormInitialValues = {
    name: gender?.name || "",
  };

  const genderSchema = object().shape({
    name: string().required("Please enter name"),
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={genderSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createGender({ body: data }));
        } else if (type === "update" && gender?.id) {
          dispatch(updateGender({ body: data, param: gender.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <UpdateGrid
          colNumber="1"
          rate="1"
          isLoading={isLoading}
          groups={{
            colLeft: (
              <FormGroup title="General information">
                <FormInput
                  label="Gender name"
                  placeholder="Type name gender here..."
                  name="name"
                  value={values.name}
                  error={touched.name ? errors.name : ""}
                  onChange={(e) => setFieldValue("name", e)}
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

export default GenderForm;
