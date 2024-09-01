import { useArchive } from "@/hooks/useArchive";
import { IUserGenderInitialState } from "@/services/store/userGender/userGender.slice";
import { createUserGender, updateUserGender } from "@/services/store/userGender/userGender.thunk";
import { FormikRefType } from "@/shared/utils/shared-types";
import { Formik } from "formik";
import { object, string } from "yup";
import lodash from "lodash";
import FormGroup from "@/components/form/FormGroup";
import FormInput from "@/components/form/FormInput";
import Label from "@/components/form/Label";

interface IUserGenderFormProps {
  formikRef?: FormikRefType<IUserGenderFormInitialValues>;
  type: "create" | "update";
  userGender?: IUserGenderFormInitialValues;
  isFormLoading?: boolean;
}

export interface IUserGenderFormInitialValues {
  id?: string;
  name: string;
  description: string;
}

const UserGenderForm = ({ formikRef, type, userGender, isFormLoading = false }: IUserGenderFormProps) => {
  const { dispatch } = useArchive<IUserGenderInitialState>("userGender");

  const initialValues: IUserGenderFormInitialValues = {
    name: userGender?.name || "",
    description: userGender?.description || "",
  };

  const userGenderSchema = object().shape({
    name: string().required("Vui lòng nhập tên giới tính"),
    description: string(),
  });

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={userGenderSchema}
      onSubmit={(data) => {
        if (type === "create") {
          dispatch(createUserGender({ body: lodash.omit(data, "id") }));
        } else if (type === "update" && userGender?.id) {
          dispatch(updateUserGender({ body: lodash.omit(data, "id"), param: userGender.id }));
        }
      }}
    >
      {({ values, errors, touched, handleBlur, setFieldValue }) => (
        <FormGroup title="Thông tin chung" isLoading={isFormLoading}>
          <Label text="Tên giới tính" isRequired />
          <FormInput
            placeholder="Nhập tên giới tính ở đây..."
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
            onChange={(e) => setFieldValue("description", e)}
            onBlur={handleBlur}
          />
        </FormGroup>
      )}
    </Formik>
  );
};

export default UserGenderForm;
