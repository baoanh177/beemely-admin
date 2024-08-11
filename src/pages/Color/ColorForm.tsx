import { useArchive } from "@/hooks/useArchive";
import { IColorInitialState } from "@/services/store/color/color.slice";
import { createColor, updateColor } from "@/services/store/color/color.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";
import lodash from "lodash";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";

interface IColorFormProps {
  formikRef?: FormikRefType<IColorFormInitialValues>;
  type: "create" | "update";
  color?: IColorFormInitialValues;
  isFormLoading?: boolean;
}

export interface IColorFormInitialValues {
  id?: string;
  name: string;
  value: string;
}

const ColorForm = ({ formikRef, type, color, isFormLoading = false }: IColorFormProps) => {
  const { dispatch } = useArchive<IColorInitialState>("color");

  const initialValues: IColorFormInitialValues = {
    name: color?.name || "",
    value: color?.value || "",
  };

  const colorSchema = object().shape({
    name: string().required("Vui lòng nhập tên màu"),
    value: string()
      .required("Vui lòng nhập giá trị màu")
      .matches(/^#[0-9A-Fa-f]{6}$/, "Giá trị màu không hợp lệ (ví dụ: #FF0000)"),
  });

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={colorSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createColor({ body: lodash.omit(data, "id") }));
        } else if (type === "update" && color?.id) {
          dispatch(updateColor({ body: lodash.omit(data, "id"), param: color.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
          <FormInput
            label="Tên màu"
            placeholder="Nhập tên màu ở đây..."
            name="name"
            value={values.name}
            error={touched.name ? errors.name : ""}
            onChange={(e) => setFieldValue("name", e)}
            onBlur={handleBlur}
          />
          <FormInput
            label="Giá trị màu"
            placeholder="Nhập giá trị màu ở đây (ví dụ: #FF0000)..."
            name="value"
            value={values.value}
            error={touched.value ? errors.value : ""}
            onChange={(e) => setFieldValue("value", e)}
            onBlur={handleBlur}
          />
        </FormGroup>
      )}
    </Formik>
  );
};

export default ColorForm;
