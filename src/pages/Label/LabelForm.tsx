import { useArchive } from "@/hooks/useArchive";
import { ILabelInitialState } from "@/services/store/label/label.slice";
import { createLabel, updateLabel } from "@/services/store/label/label.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";
import lodash from "lodash";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import { EActiveStatus } from "@/shared/enums/status";
import Label from "@/components/form/Label";
interface ILabelFormProps {
  formikRef?: FormikRefType<ILabelFormInitialValues>;
  type: "create" | "update";
  label?: ILabelFormInitialValues;
  isFormLoading?: boolean;
}

export interface ILabelFormInitialValues {
  id?: string;
  name: string;
  description?: string;
  status: EActiveStatus;
}

const LabelForm = ({ formikRef, type, label, isFormLoading = false }: ILabelFormProps) => {
  const { dispatch } = useArchive<ILabelInitialState>("label");

  const initialValues: ILabelFormInitialValues = {
    name: label?.name || "",
    description: label?.description || "",
    status: label?.status || EActiveStatus.INACTIVE,
  };

  const labelSchema = object().shape({
    name: string().required("Vui lòng nhập tên nhãn"),
  });
  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={labelSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createLabel({ body: lodash.omit(data, ["id", "status"]) }));
        } else if (type === "update" && label?.id) {
          dispatch(updateLabel({ body: lodash.omit(data, ["id", "status"]), param: label.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
          <Label text="Tên nhãn" isRequired />
          <FormInput
            placeholder="Nhập tên nhãn ở đây..."
            name="name"
            value={values.name}
            error={touched.name ? errors.name : ""}
            onChange={(e) => setFieldValue("name", e)}
            onBlur={handleBlur}
          />
          <Label text="Mô tả" />
          <FormInput
            placeholder="Nhập mô tả ở đây..."
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

export default LabelForm;
