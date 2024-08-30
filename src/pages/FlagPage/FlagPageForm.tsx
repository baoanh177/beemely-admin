import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import Label from "@/components/form/Label";
import { useArchive } from "@/hooks/useArchive";
import { createFlagPage, updateFlagPage } from "@/services/store/flagPage/flagPage.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";

interface IFlagPageFormProps {
  formikRef?: FormikRefType<IFlagPageFormInitialValues>;
  type: "create" | "update";
  flagPage?: IFlagPageFormInitialValues;
  isFormLoading?: boolean;
}

export interface IFlagPageFormInitialValues {
  id?: string;
  name: string;
}

const FlagPageForm = ({ formikRef, type, flagPage, isFormLoading = false }: IFlagPageFormProps) => {
  const { dispatch } = useArchive<IFlagPageFormInitialValues>("flagPage");
  const initialValues: IFlagPageFormInitialValues = {
    name: flagPage?.name || "",
  };

  const flagPageSchema = object().shape({
    name: string().required("Vui lòng nhập tên Trang quản lý hiển thị"),
  });

  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={flagPageSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createFlagPage({ body: data }));
        } else if (type === "update" && flagPage?.id) {
          dispatch(updateFlagPage({ body: data, param: flagPage.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
          <Label isRequired text="Tên Trang quản lý hiển thị" />
          <FormInput
            placeholder="Nhập tên Trang quản lý hiển thị ở đây..."
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

export default FlagPageForm;
