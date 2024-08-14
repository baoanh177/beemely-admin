import { useArchive } from "@/hooks/useArchive";
import { ISizeInitialState } from "@/services/store/size/size.slice";
import { createSize, updateSize } from "@/services/store/size/size.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import { ISize } from "@/services/store/size/size.model";

interface ISizeFormProps {
  formikRef?: FormikRefType<ISizeFormInitialValues>;
  type: "create" | "update";
  size?: ISize;
  isFormLoading?: boolean;
  genders?: { value: string; label: string }[];
}

export interface ISizeFormInitialValues {
  id?: string;
  name: string;
  gender: string | null;
}

const SizeForm = ({ formikRef, type, size, isFormLoading = false, genders = [] }: ISizeFormProps) => {
  const { dispatch } = useArchive<ISizeInitialState>("size");

  const initialValues: ISizeFormInitialValues = {
    name: size?.name || "",
    gender: size?.gender.id || null,
  };

  const sizeSchema = object().shape({
    name: string().required("Vui lòng nhập tên size"),
    gender: string().required("Vui lòng chọn giới tính"),
  });

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={sizeSchema}
      onSubmit={(data) => {
        const submitData = {
          name: data.name,
          gender: data.gender || null,
        };
        if (type === "create") {
          dispatch(createSize({ body: submitData }));
        } else if (type === "update" && size?.id) {
          dispatch(updateSize({ body: submitData, param: size.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
          <FormInput
            label="Tên size"
            placeholder="Nhập tên size ở đây..."
            name="name"
            value={values.name}
            error={touched.name ? errors.name : ""}
            onChange={(e) => setFieldValue("name", e)}
            onBlur={handleBlur}
          />
          <FormSelect
            label="Giới tính"
            placeholder="Chọn giới tính..."
            value={values.gender || undefined}
            error={touched.gender ? errors.gender : ""}
            onChange={(value) => setFieldValue("gender", value)}
            options={genders}
          />
        </FormGroup>
      )}
    </Formik>
  );
};

export default SizeForm;
